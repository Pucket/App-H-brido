import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ServicoPage } from './servico.page';

describe('ServicoPage', () => {
  let component: ServicoPage;
  let fixture: ComponentFixture<ServicoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ServicoPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ServicoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
