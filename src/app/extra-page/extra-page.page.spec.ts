import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ExtraPagePage } from './extra-page.page';

describe('ExtraPagePage', () => {
  let component: ExtraPagePage;
  let fixture: ComponentFixture<ExtraPagePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExtraPagePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ExtraPagePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
