import React, {useState, useEffect} from 'react';

import api from '../../services/api';

import { Main, Section, SectionHeader, SectionMain, Form, FormInput, Input, InputLast, Hr, InputDate } from './styles';

import Header from '../../components/Header';
import Button from '../../components/Button';

const Home = () => {

    const [time, setTime] = useState(1);
    const [lastTask, setLastTask] = useState('');
    const [weekTasks, setWeekTasks] = useState('');
    const [weekMinutes, setWeekMinutes] = useState('');
    const [weekDollars, setWeekDollars] = useState('');
    const [weekReals, setWeekReals] = useState('');
    const [lastWeekTasks, setLastWeekTasks] = useState('');
    const [lastWeekMinutes, setLastWeekMinutes] = useState('');
    const [monthTasks, setMonthTasks] = useState('');
    const [monthMinutes, setMonthMinutes] = useState('');
    const [monthDollars, setMonthDollars] = useState('');
    const [monthReals, setMonthReals] = useState('');
    const [lastMonthTasks, setLastMonthTasks] = useState('');
    const [lastMonthMinutes, setLastMonthMinutes] = useState('');
    const [from, setFrom] = useState('');
    const [to, setTo] = useState('');
    const [customTasks, setCustomTasks] = useState('');
    const [customMinutes, setCustomMinutes] = useState('');
    const [customDollars, setCustomDollars] = useState('');
    const [customReals, setCustomReals] = useState('');

    useEffect( () => {
      getLastTask();
      getWeekTasks();
      getMonthTasks();
    }, []);

    const taskSubmit = async (e) => {
        e.preventDefault();

        const data = { time }

        try {
            await api.post('tasks', data);
            getLastTask();
            getWeekTasks();
            getMonthTasks();      
            alert('Recorded!');
        } catch (err) {
            alert(`Error on submit. \n Original Message:\n ${err}`);
        }
    };

    const getLastTask = async () => {
        try {
            const res = await api.get('tasks/last');
            const last = `${res.data[0].time} minutes in ${res.data[0].submit}`;
            setLastTask(last);
        } catch (err) {
            alert(`Error on get the last task. \n Original Message:\n ${err}`);
        }
    };

    const undoTask = async (e) => {
      e.preventDefault();  
      try {
          await api.delete('tasks/delete');
          getLastTask();
          getWeekTasks();
          getMonthTasks();    
          alert('Deleted!');
        } catch (err) {
          alert(`Error on deleting last task. \n Original Message:\n ${err}`);
        }
    };

    const getWeekTasks = async () => {
      try {
          const res = await api.get('tasks/week');
          setWeekTasks(res.data.tasks);
          setWeekMinutes(res.data.minutes);
          setWeekDollars(parseFloat(res.data.dollars).toFixed(2));
          setWeekReals(parseFloat(res.data.reals).toFixed(2));
          setLastWeekTasks(res.data.lastTasks);
          setLastWeekMinutes(res.data.lastMinutes);
      } catch (err) {
          alert(`Error on get the week results. \n Original Message:\n ${err}`);
      }
    };

    const getMonthTasks = async () => {
      try {
          const res = await api.get('tasks/month');
          setMonthTasks(res.data.tasks);
          setMonthMinutes(res.data.minutes);
          setMonthDollars(parseFloat(res.data.dollars).toFixed(2));
          setMonthReals(parseFloat(res.data.reals).toFixed(2));
          setLastMonthTasks(res.data.lastTasks);
          setLastMonthMinutes(res.data.lastMinutes);
      } catch (err) {
          alert(`Error on get the month results. \n Original Message:\n ${err}`);
      }
    };

    const handleFilter = async (e) => {
      e.preventDefault();  

      try {
        const res = await api.get('tasks/interval', {
            params: {
                from : from,
                to : to
            }
        });
        setCustomTasks(res.data.tasks);
        setCustomMinutes(res.data.minutes);
        setCustomDollars(parseFloat(res.data.dollars).toFixed(2));
        setCustomReals(parseFloat(res.data.reals).toFixed(2));
      } catch (err) {
        alert(`Error on fetching data. \n Original Message:\n ${err}`);
      }
    };  

    return (
        <div className="container">
            <Header text="Settings" path="/settings" />
            <Main>
                <Section>
                    <SectionHeader>
                      <h1>Task</h1>
                      <Hr/>
                    </SectionHeader>
                    <SectionMain>
                        <Form onSubmit={taskSubmit}>
                            <FormInput>
                                <label>Task<br/> Minutes</label>
                                <Input onChange={ e => setTime(e.target.value)} type="number" 
                                    min="0.5" step="0.5" value={time} autoFocus required />
                            </FormInput>
                            <Button text="Add" type="submit" />
                        </Form>
                        <Form onSubmit={undoTask}>
                            <FormInput>
                                <label>Last<br/> Addition</label>
                                <InputLast type="text" value={lastTask} readOnly/>
                            </FormInput>    
                            <Button text="Undo" type="submit" />
                        </Form>
                    </SectionMain>
                </Section>

                <Section>
                    <SectionHeader>
                      <h1>Week Results</h1>
                      <Hr/>
                    </SectionHeader>
                    <SectionMain>
                        <Form>
                            <FormInput>
                                <label>Tasks</label>
                                <Input type="text" value={weekTasks} readOnly />
                            </FormInput>
                            <FormInput>  
                                <label>Minutes</label>
                                <Input type="text" value={weekMinutes} readOnly />
                            </FormInput>
                            <FormInput>
                                <label>U$</label>
                                <Input type="text" value={weekDollars} readOnly />
                            </FormInput>
                            <FormInput>
                                <label>R$</label>
                                <Input type="text" value={weekReals} readOnly />
                            </FormInput>
                        </Form>
                        <Form>
                            <FormInput>
                                <label>Last Week<br/> Tasks</label>
                                <Input type="text" value={lastWeekTasks} readOnly />
                            </FormInput>
                            <FormInput>    
                                <label>Last Week<br/> Minutes</label>
                                <Input type="text" value={lastWeekMinutes} readOnly />
                            </FormInput>
                        </Form>
                    </SectionMain>
                </Section>

                <Section>
                    <SectionHeader>
                      <h1>Month Results</h1>
                      <Hr/>
                    </SectionHeader>
                    <SectionMain>
                        <Form>
                            <FormInput>
                                <label>Tasks</label>
                                <Input type="text" value={monthTasks} readOnly />
                            </FormInput>
                            <FormInput>  
                                <label>Minutes</label>
                                <Input type="text" value={monthMinutes} readOnly />
                            </FormInput>
                            <FormInput>
                                <label>U$</label>
                                <Input type="text" value={monthDollars} readOnly />
                            </FormInput>
                            <FormInput>
                                <label>R$</label>
                                <Input type="text" value={monthReals} readOnly />
                            </FormInput>
                        </Form>
                        <Form>
                            <FormInput>
                                <label>Last Month<br/> Tasks</label>
                                <Input type="text" value={lastMonthTasks} readOnly />
                            </FormInput>
                            <FormInput>    
                                <label>Last Month<br/> Minutes</label>
                                <Input type="text" value={lastMonthMinutes} readOnly />
                            </FormInput>
                        </Form>
                    </SectionMain>
                </Section>
                
                <Section>
                    <SectionHeader>
                      <h1>Custom Interval</h1>
                      <Hr/>
                    </SectionHeader>
                    <SectionMain>
                        <Form onSubmit={handleFilter} >
                            <FormInput>
                                <label>From</label>
                                <InputDate type="date" value={from} onChange={ e => setFrom(e.target.value)} />
                            </FormInput>
                            <FormInput>  
                                <label>To</label>
                                <InputDate type="date" value={to} onChange={ e => setTo(e.target.value)} />
                            </FormInput>
                            <Button text="Filter" type="submit" />
                        </Form>
                        <Form>
                            <FormInput>
                                <label>Tasks</label>
                                <Input type="text" value={customTasks} readOnly />
                            </FormInput>
                            <FormInput>  
                                <label>Minutes</label>
                                <Input type="text" value={customMinutes} readOnly />
                            </FormInput>
                            <FormInput>
                                <label>U$</label>
                                <Input type="text" value={customDollars} readOnly />
                            </FormInput>
                            <FormInput>
                                <label>R$</label>
                                <Input type="text" value={customReals} readOnly />
                            </FormInput>
                        </Form>

                    </SectionMain>
                </Section>
            </Main>      
        </div>
    )
}

export default Home;