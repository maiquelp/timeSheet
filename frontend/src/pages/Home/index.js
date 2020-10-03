import React, {useState, useEffect} from 'react';

import api from '../../services/api';

import { Main, Section, SectionHeader, SectionMain, Form, FormInput, Input, InputLast, Hr} from './styles';

import Header from '../../components/Header';
import Button from '../../components/Button';

const Home = () => {

    const [time, setTime] = useState(1);
    const [lastTask, setLastTask] = useState();
    const [weekTasks, setWeekTasks] = useState();
    const [weekMinutes, setWeekMinutes] = useState();
    const [weekReals, setWeekReals] = useState();
    const [lastWeekTasks, setLastWeekTasks] = useState();
    const [lastWeekMinutes, setLastWeekMinutes] = useState();
    const [monthTasks, setMonthTasks] = useState();
    const [monthMinutes, setMonthMinutes] = useState();
    const [monthReals, setMonthReals] = useState();
    const [lastMonthTasks, setLastMonthTasks] = useState();
    const [lastMonthMinutes, setLastMonthMinutes] = useState();

    useEffect( () => {
      getLastTask();
      getWeekTasks();
      getMonthTasks();
    }, []);

    const taskSubmit = async (e) => {
        e.preventDefault();

        const data = { time }

        try {
            await api.post('task', data);
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
            const res = await api.get('lastTask');
            const last = `${res.data[0].time} minutes in ${res.data[0].submit}`;
            setLastTask(last);
        } catch (err) {
            alert(`Error on get the last task. \n Original Message:\n ${err}`);
        }
    };

    const undoTask = async (e) => {
      e.preventDefault();  
      try {
          await api.delete('deleteTask');
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
          const res = await api.get('week');
          setWeekTasks(res.data[0].tasks);
          setWeekMinutes(res.data[1].minutes);
          setWeekReals(parseFloat(res.data[2].reals).toFixed(2));
          setLastWeekTasks(res.data[3].lastTasks);
          setLastWeekMinutes(res.data[4].lastMinutes);
      } catch (err) {
          alert(`Error on get the week results. \n Original Message:\n ${err}`);
      }
    };

    const getMonthTasks = async () => {
      try {
          const res = await api.get('month');
          setMonthTasks(res.data[0].tasks);
          setMonthMinutes(res.data[1].minutes);
          setMonthReals(parseFloat(res.data[2].reals).toFixed(2));
          setLastMonthTasks(res.data[3].lastTasks);
          setLastMonthMinutes(res.data[4].lastMinutes);
      } catch (err) {
          alert(`Error on get the week results. \n Original Message:\n ${err}`);
      }
    };



    return (
        <div className="container">
            <Header text="Settings"/>
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
                                <Input onChange={ e => setTime(e.target.value)} placeholder="1" type="number" 
                                    min="0.5" step="0.5" value={time} autoFocus />
                            </FormInput>
                            <Button text="Add" type="submit" />
                        </Form>
                        <Form onSubmit={undoTask}>
                            <FormInput>
                                <label>Last<br/> Addition</label>
                                <InputLast type="text" value={lastTask} readonly/>
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
                                <Input type="text" value={weekTasks} readonly />
                            </FormInput>
                            <FormInput>  
                                <label>Minutes</label>
                                <Input type="text" value={weekMinutes} readonly />
                            </FormInput>
                            <FormInput>
                                <label>R$</label>
                                <Input type="text" value={weekReals} readonly />
                            </FormInput>
                        </Form>
                        <Form>
                            <FormInput>
                                <label>Last Week<br/> Tasks</label>
                                <Input type="text" value={lastWeekTasks} readonly />
                            </FormInput>
                            <FormInput>    
                                <label>Last Week<br/> Minutes</label>
                                <Input type="text" value={lastWeekMinutes} readonly />
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
                                <Input type="text" value={monthTasks} readonly />
                            </FormInput>
                            <FormInput>  
                                <label>Minutes</label>
                                <Input type="text" value={monthMinutes} readonly />
                            </FormInput>
                            <FormInput>
                                <label>R$</label>
                                <Input type="text" value={monthReals} readonly />
                            </FormInput>
                        </Form>
                        <Form>
                            <FormInput>
                                <label>Last Month<br/> Tasks</label>
                                <Input type="text" value={lastMonthTasks} readonly />
                            </FormInput>
                            <FormInput>    
                                <label>Last Month<br/> Minutes</label>
                                <Input type="text" value={lastMonthMinutes} readonly />
                            </FormInput>
                        </Form>
                    </SectionMain>
                </Section>
            </Main>      
        </div>
    )
}

export default Home;