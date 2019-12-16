export const contactingOptions = {
  'phone': {
    type: 'phone',
    icon: ['fa', 'phone'],
    position: 1
  },
  'email': {
    type: 'email',
    icon: ['fa', 'envelope'],
    position: 2
  },
  'github': {
    type: 'github',
    icon: ['fab', 'github-square'],
    position: 3,
    text: 'github.com',
    link: '',
  },
  'linkedin': {
    type: 'linkedin',
    icon: ['fab', 'linkedin-in'],
    position: 4,
    text: 'linkedin.com',
    link: '',
    props: {
      style: {color: '#0E76A8'}
    }
  },
  'facebook': {
    type: 'facebook',
    icon: ['fab', 'facebook-f'],
    position: 5,
    text: 'facebook.com',
    link: '',
    props: {
      style: {color: '#3B5998'}
    }
  },
  'twitter': {
    type: 'twitter',
    icon: ['fab', 'twitter'],
    position: 6,
    text: 'twitter.com',
    link: '',
    props: {
      style: {color: '#00ACEE'}
    }
  }
}

export const contactOptionsKeys = Object.keys(contactingOptions);