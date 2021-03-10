import { IdFilterPipe } from '@shared/pipes/id-filter.pipe';

describe('IdFilterPipe', () => {
  it('create an instance', () => {
    const pipe = new IdFilterPipe();
    expect(pipe).toBeTruthy();
  });
});
