import { TestBed, inject } from '@angular/core/testing';

import { PrivateChannelService } from './private-channel.service';

describe('PrivateChannelService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PrivateChannelService]
    });
  });

  it('should be created', inject([PrivateChannelService], (service: PrivateChannelService) => {
    expect(service).toBeTruthy();
  }));
});
