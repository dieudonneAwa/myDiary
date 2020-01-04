/* eslint-disable no-console */
import app from './app';

const port = process.env.PORT || 1000;
app.listen(port, () => console.log(`App listening at http://localhost:${port}`));
