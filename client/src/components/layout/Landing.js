import React, { useState } from 'react';
import axios from 'axios';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';


export const Landing = () => {
    const [formData, setFormData] = useState({
        name: ''
    });

    const { name } = formData;
    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });
    const onSubmit = e => {
        e.preventDefault();
        console.log(formData);
    }

    return (
        <section className="landing">
            <div className="dark-overlay">
                <div className="landing-inner">
                    <p className="lead"><i className="fas fa-binoculars"></i>  Search by Organization Name</p>
                    <form className="form" onSubmit={e => onSubmit(e)}>
                        <div className="form-group">
                            <input
                                id="orgsearch"
                                type="text"
                                placeholder="Organization Name"
                                name="name"
                                value={name}
                                onChange={e => onChange(e)}
                                required
                            />
                        </div>
                        <input type="submit" className="btn btn-primary" value="Search" />
                    </form>



                    {/* <label for="orgsearch"><i className="fas fa-binoculars"></i> Search by Organization Name</label>
                    <input id="orgsearch" />
                    <ul id="ingredients"></ul> */}


                </div>

            </div>
        </section>
    )
}

export default Landing