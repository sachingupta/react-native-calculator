// InputButton.js
/**
 * The Text view uses this.props.value. Props are essentially static data that we can pass to child components,
 *  as we’ll see when we return to the Calculator class.
 * 
 */

import React, { Component } from 'react';
import {
    TouchableHighlight,
    Text
} from 'react-native';

import Style from './Style';

export default class InputButton extends Component {

    render(){
        return (
            <TouchableHighlight style={[Style.inputButton, this.props.highlight ? Style.inputButtonHighlighted : null]} 
                                underlayColor="#193441"
                                onPress={this.props.onPress}>
                <Text style={Style.inputButtonText}>{this.props.value}</Text>
            </TouchableHighlight>
        );
    }
} 