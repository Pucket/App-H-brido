import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ExibirServicoPage } from './exibir-servico.page';

describe('ExibirServicoPage', () => {
  let component: ExibirServicoPage;
  let fixture: ComponentFixture<ExibirServicoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExibirServicoPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ExibirServicoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
