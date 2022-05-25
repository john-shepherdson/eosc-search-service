import {Component, EventEmitter, Inject, Injectable, OnInit, Output,} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {FormControl} from '@angular/forms';
import {combineLatest, debounceTime, distinctUntilChanged, map, Observable, switchMap, tap,} from 'rxjs';
import {faMagnifyingGlass} from '@fortawesome/free-solid-svg-icons';
import {UntilDestroy, untilDestroyed} from '@ngneat/until-destroy';
import {
  ICollectionSearchMetadata,
  IResult,
  ISearchResults,
  ISet,
  MAIN_SEARCH_SET,
  ResultsRepository,
  ResultsService,
  SEARCH_SET_LIST,
  toSolrQueryParams,
  TrainingService,
} from '@eosc-search-service/search';
import {HttpClient} from '@angular/common/http';
import {CommonSettings, ESS_SETTINGS} from '@eosc-search-service/common';
import {HashMap} from "@eosc-search-service/types";

export const RESULTS_PER_CATEGORY = 3;

@Injectable()
class SuggestionsResultsRepository extends ResultsRepository {
  constructor(@Inject(SEARCH_SET_LIST) sets: ISet[]) {
    super('suggestions', sets);
  }
}

@Injectable()
export class SuggestionsResultsService extends ResultsService {
  override reduceResults = (
    results: ISearchResults<IResult>[],
    metadataList: ICollectionSearchMetadata[]
  ): IResult[] => {
    return (
      results.reduce(
        (acc, response) => [...acc, ...response.results.slice(0, 3)],
        [] as IResult[]
      )
    );
  };

  constructor(
    http: HttpClient,
    _repository: SuggestionsResultsRepository,
    _trainingService: TrainingService,
    @Inject(ESS_SETTINGS) settings: CommonSettings
  ) {
    super(http, _trainingService, _repository, settings);
  }
}

@UntilDestroy()
@Component({
  selector: 'ess-search-input',
  template: `
    <div id="container">
      <input
        autocomplete="off"
        type="text"
        id="search"
        i18n-placeholder
        placeholder="Search in catalogs"
        (focus)="onFocus()"
        (keydown.enter)="setParam()"
        [formControl]="fc"
      />
      <button
        id="btn--search"
        class="btn btn-primary"
        type="button"
        (click)="setParam()"
      >
        <fa-icon [icon]="faMagnifyingGlass"></fa-icon>
        <span
        >&nbsp;&nbsp;&nbsp;&nbsp;<ng-container i18n>Search</ng-container
        >&nbsp;&nbsp;</span
        >
      </button>
      <button
        *ngIf="fc.value && fc.value.trim() !== ''"
        id="btn--clear-query"
        type="button"
        class="btn btn-secondary"
        (click)="clearQuery()"
      >
        Clear phrase <span>&cross;</span>
      </button>

      <ng-container *ngIf="(groupedResults$ | async) as groupedResults">
        <div
          class="list-group suggestions"
          *ngIf="(groupedResults | notEmpty) && focused && fc.value"
        >
          <ng-container *ngFor="let group of groupedResults">
            <div
              class="list-group-item"
            ><span class="group">{{ group.caption }}</span> &nbsp;<a [routerLink]="['/search', group.link]" queryParamsHandling="merge" [queryParams]="{q: fc.value}">see all</a></div
            >
            <a
              *ngFor="let result of group.results"
              [href]="result.url"
              (click)="onBlur()"
              target="_blank"
              class="list-group-item list-group-item-action result"
            >{{ result.title }}</a
            >
          </ng-container>
        </div>
      </ng-container>
    </div>
    <div class="backdrop" *ngIf="focused" (click)="onBlur()"></div>
  `,
  styles: [
    `
      .backdrop {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-color: black;
        opacity: 0;
        z-index: 10;
      }
      .suggestions {
        text-align: left;
        position: absolute;
        top: 40px;
        width: calc(100% - 140px);
        left: 20px;
        border-radius: 0 0 10px 10px;
        z-index: 10;
      }
      .suggestions .group {
        text-transform: uppercase;
        color: #6c757d;
      }
      .suggestions .result {
        padding-left: 40px;
      }

      #container {
        z-index: 11;
        position: relative;
      }
      #search {
        width: calc(100% - 120px);
        border: solid 1px rgba(0, 0, 0, 0.1);
        border-radius: 25px 0 0 25px;
        padding-left: 20px;
      }
      #search:focus {
        border: solid 1px rgba(0, 0, 0, 0.1);
      }
      #btn--search {
        border-radius: 0 25px 25px 0;
        width: 120px;
        background-color: #3987be;
      }
      #btn--clear-query {
        position: absolute;
        top: 7px;
        right: 130px;
        font-size: 12px;
        border-radius: 50px;
        padding: 4px 14px;
        background-color: rgba(0, 0, 0, 0.3);
        border: none;
      }
      #search,
      #btn--search {
        float: left;
        height: 40px;
      }
    `,
  ],
  providers: [SuggestionsResultsRepository, SuggestionsResultsService],
})
export class SearchInputComponent implements OnInit {
  focused = false;

  faMagnifyingGlass = faMagnifyingGlass;
  fc = new FormControl();
  groupedResults$: Observable<{results: IResult[], link: string, caption: string}[]> = this._repository.results$.pipe(map(results => {
    const categories: HashMap<{results: IResult[], link: string, caption: string}> = {};

    results.forEach(result => {
      if (categories[result.type] === undefined)  {
        categories[result.type] = {
          caption: result.type,
          link: result.typeUrlPath,
          results: []
        }
      }
      categories[result.type].results.push(result);
    })

    return Object.values(categories);
  }));
  @Output() searchedValue = new EventEmitter<string>();

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _repository: SuggestionsResultsRepository,
    private _service: SuggestionsResultsService,
    @Inject(MAIN_SEARCH_SET) private _defaultSet: ISet
  ) {
    this._router.routeReuseStrategy.shouldReuseRoute = () => false;
  }

  ngOnInit() {
    this._route.queryParamMap
      .pipe(
        map((params) => params.get('q')),
        map((q) => (q === '*' ? '' : q)),
        untilDestroyed(this)
      )
      .subscribe((q) => this.fc.setValue(q));

    combineLatest({
      queryParams: this._route.queryParams.pipe(map(toSolrQueryParams)),
      activeSet: this._route.data.pipe(
        map((data) => (data['activeSet'] ?? this._defaultSet) as ISet)
      ),
      q: this.fc.valueChanges.pipe(distinctUntilChanged()),
    })
      .pipe(
        debounceTime(150),
        tap(() => this.onFocus()),
        switchMap(({ activeSet, queryParams, q }) =>
          this._service.search$(activeSet.collections, { ...queryParams, q }, RESULTS_PER_CATEGORY)
        ),
        untilDestroyed(this)
      )
      .subscribe();
  }

  onFocus() {
    if (this.fc.value) {
      this.focused = true;
    }
  }

  onBlur() {
    this.focused = false;
  }

  async setParam() {
    const currentPath = this._router.url.split('?')[0];
    const newPath = currentPath === '/' ? ['/search/all'] : [];
    const q = this.fc.value || '*';
    await this._router.navigate(newPath, {
      queryParams: { q },
      queryParamsHandling: 'merge',
    });
  }

  async clearQuery() {
    this.fc.setValue('');

    const currentPath = this._router.url.split('?')[0];
    if (currentPath !== '/') {
      await this.setParam();
    }
  }
}
