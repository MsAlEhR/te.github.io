import React, {Component} from 'react';
import Dropzone from 'react-dropzone';

class CmpDropZone extends Component {
    constructor() {
        super();
        this.state = {
            files: []
        };
    }

    render() {
        const {
            onDrop
        } = this.props;
        const files = this.state.files.map(file => (
            <li key={file.name}>
                {file.name} - {file.size} bytes
            </li>
        ));

        return (
            <Dropzone onDrop={onDrop}>
                {({getRootProps, getInputProps}) => (
                    <section className="container">
                        <div {...getRootProps({className: 'dropzone'})}>
                            <input {...getInputProps()} />
                            <p style={{marginLeft:'35%',marginTop:'50%'}}>Drag and drop CSV file or click </p>
                        </div>
                        <aside>
                            <ul>{files}</ul>
                        </aside>
                    </section>
                )}
            </Dropzone>
        );
    }
}

export default CmpDropZone;