import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { RedefinirSenhaEmpresaPage } from './redefinir-senha-empresa.page';

describe('RedefinirSenhaEmpresaPage', () => {
  let component: RedefinirSenhaEmpresaPage;
  let fixture: ComponentFixture<RedefinirSenhaEmpresaPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RedefinirSenhaEmpresaPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(RedefinirSenhaEmpresaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
