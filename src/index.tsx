// This is the entry point for the renderer process.
//
// Here we disable a few electron settings and mount the root component.
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Text } from 'react-native-elements';

// mount the root component
ReactDOM.render(<Text>Hi</Text>, document.getElementById('app'));
