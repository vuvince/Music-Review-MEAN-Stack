import { TestBed } from "@angular/core/testing";

import { DmcaFormService } from "./dmca-form.service";

describe("DmcaFormService", () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it("should be created", () => {
    const service: DmcaFormService = TestBed.get(DmcaFormService);
    expect(service).toBeTruthy();
  });
});
