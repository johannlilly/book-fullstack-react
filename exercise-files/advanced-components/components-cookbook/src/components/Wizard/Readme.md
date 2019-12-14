## Wizard
    
    <Wizard>
        <Wizard.Step 
           title={'Name'}
           validateComplete={(data => !!data.name)}
           component={(props => (
           <form onSubmit={props.onNext}>
            <input name='name'
                type='string'
                autoFocus={true}
                onChange={props.onChangeInput('name')}
                value={props.data && props.data['name']}
                placeholder='Your name' />
              <input type='submit' value='Next'
                disabled={!props.canGoNext}/>
            </form>
           ))}
           />
        <Wizard.Step 
           title={'Email'}
           validateComplete={(data => !!data.email)}
           component={(props => (
           <form onSubmit={props.onNext}>
            <input name='email'
                type='email'
                autoFocus={true}
                onChange={props.onChangeInput('email')}
                value={props.data && props.data['email']}
                placeholder='Your email' />

              <input type='submit' value='Next'
                disabled={!props.canGoNext}/>
            </form>
           ))}
           />
        <Wizard.Step 
            title={'confirmation'}
            component={(props => (
              <div>
                <div>Your name is: {props.data.name}</div>
                <div>and email: {props.data.email}</div>
              </div>
            ))}
            />
    </Wizard>


The `Wizard` can be used to show a multistage form.

The component is broken out in two different components. 

1. Wizard 
2. Wizard.Step
    
The parent `Wizard` component contains multiple `Wizard.Step` components. The `Wizard.Step` component describes a single step in a wizard form.
