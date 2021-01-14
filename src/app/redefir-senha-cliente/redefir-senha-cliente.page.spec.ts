import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { RedefirSenhaClientePage } from './redefir-senha-cliente.page';

describe('RedefirSenhaClientePage', () => {
  let component: RedefirSenhaClientePage;
  let fixture: ComponentFixture<RedefirSenhaClientePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RedefirSenhaClientePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(RedefirSenhaClientePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
