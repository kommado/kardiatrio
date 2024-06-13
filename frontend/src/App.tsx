import {defaultTheme} from "react-admin";
import {IsSetup} from "../wailsjs/go/main/App";
import {Fragment, useState} from "react";
import {Setup} from "./setup/Setup";

const myTheme = {
    ...defaultTheme,
    palette: {
        mode: 'dark'
    },
    typography: {
        // Use the system font instead of the default Roboto font.
        fontFamily: [
            '-apple-system',
            'BlinkMacSystemFont',
            '"Segoe UI"',
            'Arial',
            'sans-serif',
        ].join(','),
    },
    components: {
        ...defaultTheme.components,
        MuiTextField: {
            defaultProps: {
                variant: 'outlined' as const,
            },
        },
        MuiFormControl: {
            defaultProps: {
                variant: 'outlined' as const,
            },
        },
    },
};

function AdminApp() {
    return <Fragment>Loading app.</Fragment>
}

function App() {
    const [isSetup, setIsSetup] = useState(false)

    IsSetup().then((result) => (setIsSetup(result)))

    if(isSetup) {
        return <AdminApp />
    } else {
        return <Setup />
    }
}

  // <Admin
  //       dataProvider={dataProvider}
  //     //dataProvider={simpleRestProvider('http://127.0.0.1:8080', fetchUtils.fetchJson, 'X-Total-Count')}
  //     //authProvider={authProvider}
  //     theme={myTheme}
  // >
  //   <Resource
  //     name="patients"
  //     list={ListGuesser}
  //     edit={EditGuesser}
  //     show={ShowGuesser}
  //   />
  // </Admin>

//);

export default App;