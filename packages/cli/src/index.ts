#!/usr/bin/env node
global.hrstart = process.hrtime();

import './app/env';
import { app } from './app/bootstrap';

app.run();
