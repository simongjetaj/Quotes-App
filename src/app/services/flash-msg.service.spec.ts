import { TestBed } from '@angular/core/testing';

import { FlashMsgService } from './flash-msg.service';

describe('FlashMsgService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FlashMsgService = TestBed.get(FlashMsgService);
    expect(service).toBeTruthy();
  });
});
