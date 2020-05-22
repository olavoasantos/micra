#!/usr/bin/env node
import './app/env';
import { app } from './app/bootstrap';

global.hrstart = process.hrtime();

app.run();
