const initialState = {
  user: {
    latitude: null,
    longitude: null,
    first_name: "Melinda",
    last_name: "Manager",
    email_address: "melinda.manager@fake.com",
    role: "manager"
  },
  locations: [
    {
      id: 5,
      name: "Melindas Tarot",
      address: "1234 102nd NE",
      phone_number: "5032748495",
      contact: "{}",
      services: {
        services: "tarot"
      },
      practice_id: 10,
      staff: [],
      latitude: 45.4978675477985,
      longitude: 122.674751321431,
      distance: 3.30034719012792,
      bearing: "149.339077807321"
    },
    {
      id: 4,
      name: "Melindas Reiki",
      address: "3834 112th NE",
      phone_number: "5032678495",
      contact: "{}",
      services: {
        services: "reiki"
      },
      practice_id: 10,
      staff: [],
      latitude: 45.4978675477977,
      longitude: 122.67475132143,
      distance: 3.30034719015106,
      bearing: "149.339077808985"
    },
    {
      id: 3,
      name: "Tammy's Parkrose",
      address: "3783 110th NE",
      phone_number: "5039267845",
      contact: "{}",
      services: "{}",
      practice_id: 10,
      staff: [],
      latitude: 45.4976851,
      longitude: 122.6748554,
      distance: 3.31392233568426,
      bearing: "149.342985689199"
    }
  ]
};

function rootReducer(state = initialState, action) {
  return state;
}

export default rootReducer;
