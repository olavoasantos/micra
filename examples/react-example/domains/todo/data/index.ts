import { app } from 'app/bootstrap';
import { en } from 'domains/todo/data/translations/en';
import { fr } from 'domains/todo/data/translations/fr';
import { todoForm } from 'domains/todo/data/stores/todoForm';
import { todoStore } from 'domains/todo/data/stores/todoStore';
import { TodoClientService } from 'domains/todo/data/TodoClientService';
import { TodoClientRepository } from 'domains/todo/data/TodoClientRepository';
import { LocalTodoDataSource } from 'domains/todo/data/data-sources/LocalTodoDataSource';

const translation = use('translation');
translation.addResourceBundle('en', 'translation', en);
translation.addResourceBundle('fr', 'translation', fr);

app.container?.value('TodoForm', todoForm);
app.container?.value('TodoStore', todoStore);
app.container?.singleton('TodoService', TodoClientService);
app.container?.singleton('TodoRepository', TodoClientRepository);
app.container?.singleton('LocalTodoDataSource', LocalTodoDataSource);

export * from 'domains/todo/data/stores/todoForm';
export * from 'domains/todo/data/stores/todoStore';
