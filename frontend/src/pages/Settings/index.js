import React, {useState, useEffect} from 'react';

import api from '../../services/api';

import { Main, Section, SectionHeader, SectionMain, Form, FormInput, Input, Hr } from './styles';

import Header from '../../components/Header';
import Button from '../../components/Button';

const Settings = () => {

    const [dollar, setDollar] = useState('');
    const [cost, setCost] = useState('');
    const [discounts, setDiscounts] = useState('');

    useEffect(() => {
      getSettings();
    }, []);

    const setSettings = async (e) => {
        e.preventDefault();

        try {
            const data = {dollar, cost, discounts};
            await api.put('settings', data);
            alert('Recorded!');
        } catch (err) {
            alert(`Error on saving settings. \n Original Message:\n ${err}`);
        }
    };

    const getSettings = async () => {
      try {
          const {data} = await api.get('settings');
          const {dollar} = data[0];
          const {cost} = data[0];
          const {discounts} = data[0];
          setDollar(dollar);
          setCost(cost);
          setDiscounts(discounts);
      } catch (err) {
          alert(`Error on get settings. \n Original Message:\n ${err}`);
      }
    };

    return (
        <div className="container">
            <Header text="Home" path="/" />
            <Main>
                <Section>
                    <SectionHeader>
                      <h1>Settings</h1>
                      <Hr/>
                    </SectionHeader>
                    <SectionMain>
                        <Form onSubmit={setSettings}>
                            <FormInput>
                                <label>Dollar</label>
                                <Input type="number" value={dollar} onChange={ e => setDollar(e.target.value)}
                                    min="0.01" step="0.01" required  />
                            </FormInput>
                            <FormInput>  
                                <label>Cost</label>
                                <Input type="number" value={cost} onChange={ e => setCost(e.target.value)}
                                    min="0.01" step="0.01" required />
                            </FormInput>
                            <FormInput>
                                <label>Disconts</label>
                                <Input type="number" value={discounts} onChange={ e => setDiscounts(e.target.value)}
                                    min="0.01" step="0.01" required />
                            </FormInput>
                            <Button text="Save" type="submit" />

                            {/* <FormInput>
                                <label>Task<br/> Minutes</label>
                                <Input onChange={ e => setTime(e.target.value)} type="number" 
                                    min="0.5" step="0.5" value={time} autoFocus required />
                            </FormInput>
                            <Button text="Add" type="submit" /> */}
                        </Form>
                        
                    </SectionMain>
                </Section>

                {/* <Section>
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
                </Section> */}
            </Main>      
        </div>
    )
}

export default Settings;