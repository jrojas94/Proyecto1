import React, { Component } from 'react';

class App extends Component {

    constructor() {
        super();
        this.state = {
            subject: '',
            comment: '',
            _id: '',
            comentarios: []
        };
        this.handleChange = this.handleChange.bind(this);
        this.addComment = this.addComment.bind(this);
    }

    handleChange(e) {
        const { name, value } = e.target;
        this.setState({
            [name]: value
        });
    }

    addComment(e) {
        e.preventDefault();
        if(this.state._id) {
            fetch(`/api/comments/${this.state._id}`, {
                method: 'PUT',
                body: JSON.stringify({
                    subject: this.state.subject,
                    comment: this.state.comment
                }),
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            })
            .then(res => res.json())
            .then(data => {
                M.toast({ html: 'comentario actualizado' });
                this.setState({ subject: '', comment: '', _id: '' });
                this.fetchComment();
            });
        } else {
            fetch('/api/comments', {
                method: 'POST',
                body: JSON.stringify(this.state),
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                M.toast({html: 'comentario guardado'});
                this.setState({ subject: '', comment: '' });
                this.fetchComment();
            })
            .catch(err => console.error(err));
        }
    }
    

    deleteComment(_id) {
        if (confirm('Desea eliminar el comentario?')) {
            fetch(`/api/comments/${_id}`, {
                method: 'DELETE',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                M.toast({ html: 'comentario eliminado' });
                this.fetchComment();
            });
        }
    }

    editComment(_id) {
        fetch(`/api/comments/${_id}`)
            .then(res => res.json())
            .then(data => {
                console.log(data)
                this.setState({
                    subject: data.subject,
                    comment: data.comment,
                    _id: data._id
                });
            });
    }

    componentDidMount() {
        this.fetchComment();
    }

    fetchComment() {
        fetch('api/comments')
            .then(res => res.json())
            .then(data => {
                this.setState({ comentarios: data });
                console.log(this.state.comentarios);
            });
    }

    render() {
        return (
            <div>
                {/* NAVIGATION */}
                <nav className="light-blue darken-4">
                    <div className="container">
                        <a className="brand-logo center" href="/">Blog de comentarios</a>
                    </div>
                </nav>
                <div className="container">
                    <div className="row">
                        <div className="col s5">
                            <div className="card">
                                <div className="card-content">
                                    <form onSubmit={this.addComment}>                                   
                                        <div className="row">
                                            <div className="input-field col s12">
                                                <input name="subject" onChange={this.handleChange} type="text" placeholder="Tema Comentario" value={this.state.subject}/>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="input-field col s12">
                                                <textarea name ="comment" onChange={this.handleChange} placeholder="Comentario" className="materialize-textarea" value={this.state.comment}></textarea>
                                            </div>
                                        </div>
                                        <button type="submit" className="btn light-blue darken-4">
                                            Send
                                        </button>
                                    </form>
                                </div>
                            </div>
                        </div>
                        <div className="col s7">
                            <table>
                                <thead>
                                    <tr>
                                        <th>Usuario</th>
                                        <th>Tema</th>
                                        <th>Comentario</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        this.state.comentarios.map(comentario => {
                                            return (
                                                <tr key={comentario._id}>
                                                    <td>{comentario.user}</td>
                                                    <td>{comentario.subject}</td>
                                                    <td>{comentario.comment}</td>
                                                    <td>
                                                        <button onClick={() => this.editComment(comentario._id)} className="btn light-blue darken-4">
                                                            <i className="material-icons">edit</i>
                                                        </button>
                                                        <button className="btn light-blue darken-4" onClick={ () =>this.deleteComment(comentario._id) } style={{ margin: '4px'}}>
                                                            <i className="material-icons">delete</i>
                                                        </button>
                                                    </td>
                                                </tr>
                                                )
                                            })
                                    }
                                </tbody>
                            </table>               
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default App;