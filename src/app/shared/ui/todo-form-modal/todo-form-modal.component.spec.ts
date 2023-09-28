import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TodoFormModalComponent } from './todo-form-modal.component';

describe('TodoFormModalComponent', () => {
  let component: TodoFormModalComponent;
  let fixture: ComponentFixture<TodoFormModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [TodoFormModalComponent]
    });
    fixture = TestBed.createComponent(TodoFormModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
