import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PrivateChannelComponent } from './private-channel.component';

describe('PrivateChannelComponent', () => {
  let component: PrivateChannelComponent;
  let fixture: ComponentFixture<PrivateChannelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrivateChannelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrivateChannelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
