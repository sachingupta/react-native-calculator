import React, { Component } from 'react';
import {
  View,
  Text,
  AppRegistry
} from 'react-native';

import Style from './Style';

import InputButton from './InputButton';

// Define the input buttons that will be displayed in the calculator.
const Buttons = [
    [1, 2, 3, '/'],
    [4, 5, 6, '*'],
    [7, 8, 9, '-'],
    [0, '.', '=', '+']
];

/* <View style={{flex: 8, backgroundColor: '#3E606F'}}></View> 
State allows us to update the UI of our applications based on dynamic data. 
The first thing we’ll use State for is to update the display based on the numbers entered by the user.
During the constructor is the only time you can modify state directly, after which it must be deemed immutable and 
can only be modified using setState, as we’ll see in a moment.
*/
class Calculator extends Component {
  constructor(props) {
    super(props);
    this.state = {
        previousInputValue: 0,
        inputValue: 0,
        selectedSymbol: null
    };
  }

  render() {
    return (
      <View style={Style.rootContainer}>
            <View style={Style.displayContainer}>
                <Text style={Style.displayText}>
                    {this.state.inputValue}
                </Text>
            </View>
            <View style={Style.inputContainer}>
                 {this.renderInputButtons(Buttons)}
            </View>  
        </View>
    )
  }

  /**
     * For each row in `inputButtons`, create a row View and add create an InputButton for each input in the row.
     * Note: The key on the Components within _renderInputButtons is required when you are creating an array of Components, 
     * and must be unique to each Component in the array.
     */
    renderInputButtons(inputButtons) {
        let viewContainer = [];

        for(let row=0; row< inputButtons.length; row++){
            let inputRow = [];
            let rowButtons = inputButtons[row];

            for(let col=0;col<rowButtons.length;col++){
                let input = rowButtons[col];
                inputRow.push(
                    <InputButton value={input}
                                 highlight={this.state.selectedSymbol === input}
                                 onPress={this.onInputButtonPressed.bind(this, input)}
                                 key={row + "-" + col} /  >
                );
            }

            viewContainer.push(
                <View style={Style.inputRow} key={"row-" + row}>
                    {inputRow} 
                </View> 
             );
        }
        return viewContainer;
    }

    onInputButtonPressed(input){
        switch( typeof input){
            case 'number':
                return this.handleNumberInput(input);
            case 'string':
                return this.handleStringInput(input);
        }
    }

    handleNumberInput(num){
        let newInputValue = (this.state.inputValue * 10) + num;

        this.setState({
                inputValue: newInputValue
        });
    }

    handleStringInput(strInput){
        switch(strInput){
            case '/':
            case '*':
            case '+':
            case '-':
                this.setState({
                    selectedSymbol: strInput,
                    previousInputValue: this.state.inputValue,
                    inputValue: 0
                });
                break;
            case '=':
                let symbol = this.state.selectedSymbol;
                let inputValue = this.state.inputValue;
                let previousInputValue = this.state.previousInputValue;

                if(!symbol){
                    return;
                }

                this.setState({
                    previousInputValue: 0,
                    inputValue: eval(previousInputValue + symbol + inputValue),
                    selectedSymbol: null
                });
                break;
        }
    }
}

AppRegistry.registerComponent('Calculator', () => Calculator);