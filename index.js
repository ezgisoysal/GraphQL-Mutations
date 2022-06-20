const { ApolloServer, gql } = require('apollo-server');
const { ApolloServerPluginLandingPageGraphQLPlayground } = require('apollo-server-core');
const { nanoid } = require('nanoid');
const { events, locations, users, participants } = require('./data');

const typeDefs = gql`
type Event {
  id: ID!
  title: String!
  desc: String!
  date: String!
  from: String!
  to: String!
  location_id: ID!
  user_id: ID!
  user: User!
  location: Location!
  participants: [Participant!]!
}

input CreateEventInput {
  title: String!
  desc: String!
  date: String!
  from: String!
  to: String!
  location_id: ID!
  user_id: ID!
}

input UpdateEventInput {
  title: String
  desc: String
  date: String
  from: String
  to: String
  location_id: ID
  user_id: ID
}

type Location {
  id: ID!
  name: String!
  desc: String!
  lat: String!
  lng: String!
}

input CreateLocationInput {
  name: String!
  desc: String!
  lat: String!
  lng: String!
}

input UpdateLocationInput {
  name: String
  desc: String
  lat: String
  lng: String
}

type User {
  id: ID!
  username: String!
  email: String!
  events: [Event!]!
}

input CreateUserInput {
  username: String!
  email: String!
}

input UpdateUserInput {
  username: String
  email: String
}

type Participant {
  id: ID!
  user_id: ID!
  event_id: ID!
}

input CreateParticipantInput {
  user_id: ID!
  event_id: ID!
}

input UpdateParticipantInput {
  user_id: ID
  event_id: ID
}

type DeleteAllOutput {
  count: Int 
}

type Query {
  events: [Event!]!
  event(id: ID!): Event!

  locations: [Location!]!
  location(id: ID!): Location!

  users: [User!]!
  user(id: ID!): User!

  participants: [Participant!]!
  participant(id: ID!): Participant!
}

type Mutation {
  createEvent(data: CreateEventInput!): Event!
  updateEvent(id: ID!, data: UpdateEventInput!): Event!
  deleteEvent(id: ID!): Event!
  deleteAllEvents: DeleteAllOutput!

  createLocation(data: CreateLocationInput!): Location!
  updateLocation(id: ID!, data: UpdateLocationInput!): Location!
  deleteLocation(id: ID!): Location!
  deleteAllLocations: DeleteAllOutput!

  createUser(data: CreateUserInput!): User!
  updateUser(id: ID!, data: UpdateUserInput!): User!
  deleteUser(id: ID!): User!
  deleteAllUsers: DeleteAllOutput!

  createParticipant(data: CreateParticipantInput!): Participant!
  updateParticipant(id: ID!, data: UpdateParticipantInput!): Participant!
  deleteParticipant(id: ID!): Participant!
  deleteAllParticipants: DeleteAllOutput!
}
`;


const resolvers = {
  Mutation: {
  // Event  
    createEvent: (parent, { data }) => {
      const event = { 
        id: nanoid(),
        ...data,
      };
      
      events.push(event);

      return event;
    },
    updateEvent: (parent, { id, data }) => {
      const event_index = events.findIndex((event) => event.id === id);

      if (event_index === -1) {
        throw new Error('Event not found.');
      }

      const updated_event = (events[event_index] = {
        ...events[event_index],
        ...data,
      });

      return updated_event;
    },
    deleteEvent: (parent, { id }) => {
      const event_index = events.findIndex((event) => event.id === id);

      if (event_index === -1) {
        throw new Error('Event not found.');
      }
      
      const deleted_event = events[event_index];
      events.splice(event_index, 1);

      return deleted_event;
    },
    deleteAllEvents: () => {
      const lenght = events.lenght;
      events.splice(0, lenght);

      return {
        count: lenght,
      };
    },

  // Location
    createLocation: (parent, { data }) => {
      const location = {
        id: nanoid(),
        ...data,
      };

      locations.push(location);

      return location;
    },
    updateLocation: (parent, { id, data }) => {
      const location_index = locations.findIndex((location) => location.id === id);

      if  (location_index === -1) {
        throw new Error('location not found');
      }

      const updated_location = (locations[location_index] = {
        ...locations[location_index],
        ...data,
      });

      return updated_location;
    },
    deleteLocation: (parent, { id }) => {
      const location_index = locations.findIndex((location) => location.id === id);

      if (location_index === -1) {
        throw new Error('location not found.');
      }
      
      const deleted_location = locations[location_index];
      locations.splice(location_index, 1);

      return deleted_location;
    },
    deleteAllLocations: () => {
      const lenght = locations.lenght;
      locations.splice(0, lenght);

      return {
        count: lenght,
      };
    },

  // User  
    createUser: (parent, { data }) => {
      const user = {
        id: nanoid(),
        ...data,
      };

      users.push(user);

      return user;
    },
    updateUser: (parent, { id, data }) => {
      const user_index = users.findIndex((user) => user.id === id);

      if  (user_index === -1) {
        throw new Error('user not found');
      }

      const updated_user = (users[user_index] = {
        ...users[user_index],
        ...data,
      });

      return updated_user;
    },
    deleteUser: (parent, { id }) => {
      const user_index = users.findIndex((user) => user.id === id);

      if (user_index === -1) {
        throw new Error('user not found.');
      }
      
      const deleted_user = users[user_index];
      users.splice(user_index, 1);

      return deleted_user;
    },
    deleteAllUsers: () => {
      const lenght = users.lenght;
      users.splice(0, lenght);

      return {
        count: lenght,
      };
    },

  // Participant  
    createParticipant : (parent, { data }) => {
      const participant = {
        id: nanoid(),
        ...data,
      };

      participants.push(participant);

      return participant;
    },
    updateParticipant : (parent, { id, data }) => {
      const participant_index = participants.findIndex((participant) => participant.id === id);

      if  (participant_index === -1) {
        throw new Error('participant not found');
      }

      const updated_participant = (participants[participant_index] = {
        ...participants[participant_index],
        ...data,
      });

      return updated_participant;
    },
    deleteParticipant : (parent, { id }) => {
      const participant_index = participants.findIndex((participant) => participant.id === id);

      if (participant_index === -1) {
        throw new Error('participant not found.');
      }
      
      const deleted_participant = participants[participant_index];
      participants.splice(participant_index, 1);

      return deleted_participant;
    },
    deleteAllParticipants: () => {
      const lenght = participants.lenght;
      participants.splice(0, lenght);

      return {
        count: lenght,
      };
    },
  },

  Query: {
    // Event
    events: () => events,
    event: (parent, args) => events.find((event) => event.id === args.id),

    // Location
    locations: () => locations,
    location: (parent, args) => locations.find((location) => location.id === args.id),

    // User
    users: () => users,
    user: (parent, args) => users.find((user) => user.id === args.id),

    // Participant
    participants: () => participants,
    participant: (parent, args) => participants.find((participant) => participant.id === args.id),
  },

  Event: {
    user: (parent) => users.find((user) => user.id === parent.user_id),
    location: (parent) => locations.find((location) => location.id === parent.location_id),
    participants: (parent) => participants.filter((participant) => participant.event_id === parent.id),
  },

  User: {
    events: (parent) => events.filter((event) => event.user_id === parent.id),
  },

};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  plugins: [
    ApolloServerPluginLandingPageGraphQLPlayground({})],
});

server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});