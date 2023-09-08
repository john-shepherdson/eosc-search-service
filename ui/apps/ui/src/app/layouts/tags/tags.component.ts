import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
  TrackByFunction,
} from '@angular/core';
import {
  ITag,
  IValueWithLabel,
  IValueWithLabelAndLink,
} from '@collections/repositories/types';
import { combineHighlightsWith } from './utils';
import { ViewportScroller } from '@angular/common';
import { translateDictionaryValue } from '../../dictionary/translateDictionaryValue';
import { DICTIONARY_TYPE_FOR_PIPE } from '../../dictionary/dictionaryType';

@Component({
  selector: 'ess-tags',
  template: ` <div id="tags">
    <ng-container
      *ngFor="let tag of parsedTags; let i = index; trackBy: trackByLabel"
    >
      <div class="tag-row" *ngIf="tag.values.length > 0">
        <div class="tag tag-title">{{ tag.label }}:</div>

        <div class="tag-content">
          <ng-container *ngFor="let singleValue of computeTagEntries(tag)">
            <span class="tag">
              <a
                *ngIf="!singleValue.externalLink"
                href="javascript:void(0)"
                (click)="setActiveFilter(tag.filter, singleValue.value)"
                [innerHTML]="
                  (addSubTitle(singleValue.subTitle) ?? '') +
                  ' ' +
                  (singleValue.label | filterPipe: tag.filter)
                "
              ></a>
              <a
                *ngIf="singleValue.externalLink"
                [href]="singleValue.externalLink.link ?? '#'"
                (click)="
                  _onClickExternalLink($event, singleValue.externalLink.link)
                "
                [innerHTML]="
                  (addSubTitle(singleValue.subTitle) ?? '') +
                  ' ' +
                  (singleValue.label ?? '')
                "
              ></a>
              &nbsp;
            </span>
          </ng-container>
          <span
            *ngIf="
              tag.showMoreThreshold && tag.values.length > tag.showMoreThreshold
            "
            class="show-more-tag"
            (click)="toggleShowAllTags(tag.label)"
          >
            {{ createShowMoreLabel(tag) }}
          </span>
        </div>
      </div>
    </ng-container>
  </div>`,
  styles: [
    `
      ::ng-deep .highlighted {
        background-color: #e8e7ff !important;
        padding: 3px;
      }

      .tag:last-child a::after {
        content: '';
        width: 0px;
        height: 0px;
        border-radius: 0px;
        line-height: 1.2;
      }

      .show-more-tag {
        padding: 5px;
        font-size: 12px;
        line-height: 1;
        font-weight: 525;
        color: #30549f;
        display: inline-block;
        transition: all 0.2s ease;
      }

      .show-more-tag:hover {
        color: #000000;
        cursor: pointer;
      }
    `,
  ],
})
export class TagsComponent implements OnChanges {
  parsedTags: ITag[] = [];
  showMoreStatePerTag: { [tagLabel: string]: boolean } = {};

  @Input()
  tags: ITag[] = [];

  @Input()
  highlights: { [field: string]: string[] | undefined } = {};

  @Output()
  activeFilter = new EventEmitter<{ filter: string; value: string }>();
  trackByLabel: TrackByFunction<ITag> = (index: number, entity: ITag) =>
    entity.label;

  constructor(private viewPortScroller: ViewportScroller) {}

  ngOnChanges(changes: SimpleChanges) {
    if (changes['tags'] || changes['highlights']) {
      this.parsedTags = combineHighlightsWith(this.tags, this.highlights);
      this.showMoreStatePerTag = Object.fromEntries(
        this.parsedTags.map((tag) => [tag.label, false])
      );
    }
  }

  setActiveFilter(filter: string, value: string): void {
    this.activeFilter.emit({ filter, value });
    this.viewPortScroller.scrollToPosition([0, 0]);
  }

  cleanDuplicatedTagLabel(
    array: IValueWithLabelAndLink[]
  ): IValueWithLabelAndLink[] {
    if (array[array.length - 1].value.indexOf('>') !== -1) {
      array.reverse();
    }
    const a = array.reduce(
      (accumulator: IValueWithLabel[], current: IValueWithLabel) => {
        if (
          !accumulator.find(
            (item) =>
              translateDictionaryValue(
                DICTIONARY_TYPE_FOR_PIPE.TYPE_SCIENTIFIC_DOMAINS,
                item.label
              ).toString() ===
              translateDictionaryValue(
                DICTIONARY_TYPE_FOR_PIPE.TYPE_SCIENTIFIC_DOMAINS,
                current.label
              ).toString()
          )
        ) {
          accumulator.push(current);
        }
        return accumulator;
      },
      []
    );
    return a;
  }

  // cleanComas(array: IValueWithLabelAndLink[]): IValueWithLabelAndLink[] {
  //   return array.map((val) => val.label.slice(-1) === ',');
  // }

  addSubTitle(subTitle?: string) {
    return subTitle ? `${subTitle}: ` : undefined;
  }

  _onClickExternalLink(e: MouseEvent, link?: string) {
    return link ? e : e.preventDefault();
  }

  toggleShowAllTags(tagLabel: string) {
    this.showMoreStatePerTag[tagLabel] = !this.showMoreStatePerTag[tagLabel];
  }

  computeTagEntries(tag: ITag): IValueWithLabelAndLink[] {
    if (this.showMoreStatePerTag[tag.label] || !tag.showMoreThreshold)
      return this.cleanDuplicatedTagLabel(tag.values);

    return this.cleanDuplicatedTagLabel(tag.values).slice(
      0,
      tag.showMoreThreshold
    );
  }

  createShowMoreLabel(tag: ITag): string {
    return this.showMoreStatePerTag[tag.label]
      ? 'Show less'
      : `+ ${tag.values.length - tag.showMoreThreshold!}`;
  }
}
