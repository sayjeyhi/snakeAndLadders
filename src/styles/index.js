const cta = {
  padding: '6px 24px',
  borderRadius: 32,
  background: '#fff',
  marginRight: '16px',
  border: '2px solid',
  outline: 'none',
  fontSize: 16,
  cursor: 'pointer',
  color: '#204d7b'
}

export const styles = {
  darkBlue: '#204d7b',
  lightBlue:'#d0eaed',
  gray: '#999',
  white: '#fff',
  red: '#ff0000',
  main: {
    margin: 0,
    fontSize: 14,
    color: '#2c475d',
    fontFamily: 'sans-serif'
  },
  gameBlock: {
    display: 'inline-block',
    verticalAlign: 'top',
    padding: 16
  },
  dataBlock: {
    display: 'inline-block',
    verticalAlign: 'top',
    padding: 16,
    minWidth: 320
  },
  cta: cta,
  player: {
    marginRight: 16,
    borderRadius: '100%',
    border: '4px solid',
    width: 64,
    height: 64,
    textAlign: 'center',
    lineHeight: '64px',
    verticalAlign: 'middle',
    fontSize: 32,
    marginRight: 16,
    color: '#fff',
    display: 'inline-block',
    boxShadow: '0 3px 12px rgba(0, 0, 0, 0.1)'
  },
  heading: {
    borderBottom: '2px solid #ddd',
    fontWeight: 300,
    paddingBottom: 4,
    fontSize: 32
  },
  commentry: {
    padding: 16,
    background: '#000',
    borderRadius: 4,
    color: 'lime',
    marginTop: 32,
    lineHeight: '1.6rem'
  },
  diceButton: {
    fontSize: 16,
    border: 'none',
    borderRadius: 4,
    textTransform: 'uppercase',
    padding: 32,
    width: '100%',
    letterSpacing: '4px',
    color: '#fff',
    cursor: 'pointer',
    margin: '32px 0 0',
    background: 'linear-gradient(141deg, #204d7b 0%, #204d7b 51%, #1781a9 75%)'
  },
  dice: {
    fontSize: 48,
    marginLeft: 12,
    verticalAlign: '-8px',
    lineHeight: '16px'
  },
  addPlayerCta: {
    ...cta,
    color: '#204d7b',
    float: 'right',
    marginRight: 0
  },
  endCta: {
    ...cta,
    marginTop: 32,
    color: 'red',
    padding: '12px 24px'
  },
  restartCta: {
    ...cta,
    padding: '12px 24px',
    marginTop: 32,
    color: 'gray'
  },
  results: {
    padding: '0 32px'
  },
  inlineBlock: {
    display: 'inline-block'
  },
  resultCard: {
    marginRight: 16,
    marginBottom: 16,
    padding: '16px 24px',
    borderRadius: 4,
    lineHeight: '1.6rem',
    boxShadow: '0px 3px 12px rgba(0, 0, 0, .1)',
    border: '1px solid #ccc',
    display: 'inline-block',
    background: '#fff',
    color: '#222',
    fontSize: 16,
    cursor: 'move'
  },
  rules: {
    marginTop: 16,
    fontSize: 12,
    color: '#ccc'
  }
};
