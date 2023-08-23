import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { BibliographyExportComponent, BibliographyExportContent } from './bibliography-export.component';

@NgModule({
  imports: [BrowserModule, NgbModule],
  declarations: [BibliographyExportComponent, BibliographyExportContent],
  exports: [BibliographyExportComponent],
  bootstrap: [BibliographyExportComponent]
  // entryComponents: [NgbdModalContent] // this line would be needed in Angular 8 or older
})
export class NgbdModalComponentModule {}
