import React, { Component } from 'react';
import List from './List';
import BoardData from '../FakeData';
import '../styles/Board.css'

export default class Board extends Component {
    constructor() {
        super();
        this.state = {
            boardName: 'My Super Private Board',
            boardData: BoardData,
            isAddingMode: false,
            newListName: '',
        }
    }

    toggleAdding = () => {
        this.setState({isAddingMode: !this.state.isAddingMode})
    }

    addNewList = () => {
        const boardData = this.state.boardData;
        const newList = {
            listName: this.state.newListName,
            cards: [
                {
                    name: 'First card of new list'
                },
                {
                    name: 'Next card of new list'
                }
            ]
        }
        boardData.push(newList)

        this.setState({isAddingMode: false, newListName: ''})
    }

    onNewListNameChange = (e) => {
        this.setState({newListName: e.target.value});
    }

    handleClick = () => {
        if (this.state.isAddingMode && this.state.newListName) {
            this.addNewList();
        } else {
            this.toggleAdding();
        }
    }

    renderLists = () => {
        return(
          this.state.boardData.map(list => <List cards={list.cards} listName={list.listName}/>)
        );
    }

    render() {
        console.log(this.state.boardData);
        return (
            <div>
                <div>
                    <h1>{this.state.boardName}</h1>
                    <button onClick={this.handleClick} className="btn btn-info">Add New List</button>
                    {this.state.isAddingMode ? <input onChange={this.onNewListNameChange} type="text" className="listName__input"/> : null}
                </div>
                <div className="container-fluid">
                    <div className="row flex-row flex-nowrap"> 
                        {this.renderLists()}
                    </div>
                </div>
            </div>
        );
    }
}