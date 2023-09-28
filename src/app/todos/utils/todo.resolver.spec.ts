import { TestBed } from '@angular/core/testing';
import { ResolveFn } from '@angular/router';

import { todoResolver } from './todo.resolver';
import { ITodo } from '../shared/utils/models/todo.model';

describe('utilsResolver', () => {
  const executeResolver: ResolveFn<ITodo[]> = (...resolverParameters) =>
    TestBed.runInInjectionContext(() => todoResolver(...resolverParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeResolver).toBeTruthy();
  });
});
