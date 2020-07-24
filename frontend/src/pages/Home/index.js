import React, {useState} from 'react';

import api from '../../services/api';

const Home = () => {

    const [time, setTime] = useState();
    const [exp_time, setExp_time] = useState();

    const taskSubmit = async (e) => {
        e.preventDefault();

        const data = { time, exp_time }

        try {
            await api.post('task', data);
            alert('cadastrado');

        } catch (err) {
            alert(`Erro ao cadastrar, tente novamente. \n Original Message:\n ${err}`);
        }
    }

    return (
        <div>
            <form onSubmit={taskSubmit}>
                <input onChange={ e => setTime(e.target.value)} placeholder="real time" type="number" min="0.1" step="0.1" required autoFocus />
                <input onChange={ e => setExp_time(e.target.value)} placeholder="expected time" type="number" min="0.1" step="0.1" required />
                <button type="submit">send</button>
            </form>
        </div>
    )
}

export default Home;