import Document,  {Html, Head, Main, NextScript} from 'next/document'

//Component
export default class MyDocument extends Document {
    render() {
        return(
            <Html lang="pt">
                <Head>
                    <meta charSet="UTF-8" />
                    <title>
                        Nextar Maintenance System
                    </title>
                    <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
                    <meta name="description" content="Desafio Tech Nextar" />
                    <meta httpEquiv="Content-Type" content="text/html;charset=UTF-8" />
                    <link rel="shortcut icon" href="/favicon.png" type="image/png" />
                </Head>
                <body>
                    <Main />
                    <NextScript />
                </body>
            </Html>
        );
    }
}