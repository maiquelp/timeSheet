import React, {useState} from 'react';

import api from '../../services/api';

import { Main, Section, SectionHeader, SectionMain, Form, FormInput, Input} from './styles';

import Header from '../../components/Header';
import Button from '../../components/Button';

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
        <div className="container">
            <Header text="Settings"/>
            <Main>
                <Section>
                    <SectionHeader>
                      <h1>Task</h1>
                      <hr/>
                    </SectionHeader>
                    <SectionMain>
                        <Form onSubmit={taskSubmit}>
                            <FormInput>
                                <label>Task<br/> Minutes</label>
                                <Input onChange={ e => setTime(e.target.value)} placeholder="0" type="number" min="0.5" step="0.5" required autoFocus />
                            </FormInput>
                            <Button text="Add" type="submit" />
                        </Form>
                        <Form>
                            <FormInput>
                                <label>Last<br/> Addition</label>
                                <Input type="text" />
                            </FormInput>    
                            <Button text="Undo" type="submit" />
                        </Form>
                    </SectionMain>
                </Section>

                <Section>
                    <SectionHeader>
                      <h1>Week Results</h1>
                      <hr/>
                    </SectionHeader>
                    <SectionMain>
                        <Form>
                            <FormInput>
                                <label>Tasks</label>
                                <Input onChange={ e => setTime(e.target.value)} placeholder="0" type="text" min="0.1" step="0.1" required autoFocus />
                            </FormInput>
                            <FormInput>  
                                <label>Minutes</label>
                                <Input onChange={ e => setTime(e.target.value)} placeholder="0" type="text" min="0.1" step="0.1" required autoFocus />
                            </FormInput>
                            <FormInput>
                                <label>R$</label>
                                <Input onChange={ e => setTime(e.target.value)} placeholder="0" type="text" min="0.1" step="0.1" required autoFocus />
                            </FormInput>
                        </Form>
                        <Form>
                            <FormInput>
                                <label>Last Week<br/> Tasks</label>
                                <Input onChange={ e => setTime(e.target.value)} placeholder="0" type="text" min="0.1" step="0.1" required autoFocus />
                            </FormInput>
                            <FormInput>    
                                <label>Last Week<br/> Minutes</label>
                                <Input onChange={ e => setTime(e.target.value)} placeholder="0" type="text" min="0.1" step="0.1" required autoFocus />
                            </FormInput>
                        </Form>
                    </SectionMain>
                </Section>

                <Section>
                    <SectionHeader>
                      <h1>Month Results</h1>
                      <hr/>
                    </SectionHeader>
                    <SectionMain>
                        <Form>
                            <FormInput>
                                <label>Tasks</label>
                                <Input onChange={ e => setTime(e.target.value)} placeholder="0" type="text" min="0.1" step="0.1" required autoFocus />
                            </FormInput>
                            <FormInput>  
                                <label>Minutes</label>
                                <Input onChange={ e => setTime(e.target.value)} placeholder="0" type="text" min="0.1" step="0.1" required autoFocus />
                            </FormInput>
                            <FormInput>
                                <label>R$</label>
                                <Input onChange={ e => setTime(e.target.value)} placeholder="0" type="text" min="0.1" step="0.1" required autoFocus />
                            </FormInput>
                        </Form>
                        <Form>
                            <FormInput>
                                <label>Last Month<br/> Tasks</label>
                                <Input onChange={ e => setTime(e.target.value)} placeholder="0" type="text" min="0.1" step="0.1" required autoFocus />
                            </FormInput>
                            <FormInput>    
                                <label>Last Month<br/> Minutes</label>
                                <Input onChange={ e => setTime(e.target.value)} placeholder="0" type="text" min="0.1" step="0.1" required autoFocus />
                            </FormInput>
                        </Form>
                    </SectionMain>
                </Section>
            </Main>      
        </div>
    )
}

export default Home;