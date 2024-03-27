export function Marker({ text }) {
    return (

        <div style={{
            color: 'white',
            background: 'red',
            padding: '10px',
            display: 'inline-flex',
            textAlign: 'center',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: '100%',
            transform: 'translate(-50%, -50%)'
          }}>
            {text}
          </div>
    )

}