import * as express from 'express';
import * as cookieParser from 'cookie-parser';
import * as bodyParser from 'body-parser';
import * as helmet from 'helmet';
import api from 'routes/api';
import pages from 'routes/pages';
import 'config/axios-interceptor';

const app = express();
const portNumber = 3000;
const sourceDir = 'dist';

app.use(express.static(sourceDir));

app.use(helmet());
app.use(bodyParser.json());
// Now parsing of URL will be done by querystring not qs
app.use(bodyParser.urlencoded({ extended: false }));

// #TODO - signed cookie should be required or not
app.use(cookieParser());

app.use('/v1/api', api);
app.use(pages);

app.listen(portNumber, () => {
  console.log(`Express web server started: http://localhost:${portNumber}`);
  console.log(`Serving content from /${sourceDir}/`);
});
