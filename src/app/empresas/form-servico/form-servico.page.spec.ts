import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { FormServicoPage } from './form-servico.page';

describe('FormServicoPage', () => {
  let component: FormServicoPage;
  let fixture: ComponentFixture<FormServicoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormServicoPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(FormServicoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
