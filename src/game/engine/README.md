# ECS Game Engine

This game engine is built using the Entity-Component-System (ECS) architecture and written in TypeScript. The engine is designed for creating high-performance and scalable games, providing a modular structure where various aspects of the game are implemented in separate components and systems.

## Modules

### Components
The `Components` module handles the definition and management of data associated with entities. It provides mechanisms for creating, storing, and manipulating components, which are essential for defining the state and attributes of entities in the game. This module allows you to:

- **Define Component Types**: Create various types of components to hold different types of data.
- **Manage Component Storage**: Store and retrieve components efficiently for each entity.
- **Add and Remove Components**: Assign or remove components from entities as needed.
- **Query Component Data**: Check if an entity has a particular component and access its data.

In summary, the `Components` module facilitates the organization and manipulation of entity data, enabling the implementation of diverse and complex behaviors in the game.


### Entities
The `Entities` module manages the creation and manipulation of entities within the game world. Entities are fundamental objects that can have various components attached to them, defining their state and behavior. This module provides functionality to:

- **Create Entities**: Instantiate new entities with a unique identifier and a set of associated components.
- **Manage Component Instances**: Handle the assignment and retrieval of components for each entity.
- **Instantiate Components**: Automatically initialize components for newly created entities based on configuration settings.

In essence, the `Entities` module enables the creation and management of game objects, allowing for the dynamic addition and modification of components to define the entities' roles and behaviors within the game.


### Events
The `Events` module handles event-driven communication within the game engine. It allows different parts of the system to interact and respond to various events. This module provides functionality for:

- **Emitting Events**: Trigger events and broadcast them to subscribers.
- **Subscribing to Events**: Register callback functions to respond to specific events when they occur.
- **Defining Event Types**: Structure events with a type and associated payload data.

In summary, the `Events` module facilitates flexible and decoupled communication between different systems and components by using an event-driven approach.


### Object Pool
The `Object Pool` module manages the reuse of objects to improve performance and reduce memory allocation overhead. It provides an efficient way to handle objects that are frequently created and destroyed. This module includes functionality for:

- **Allocating Objects**: Retrieve objects from the pool for use.
- **Releasing Objects**: Return objects to the pool for future reuse.
- **Reserving Capacity**: Pre-allocate a specified number of objects to reduce allocation time during runtime.
- **Setting Limits**: Define the maximum number of objects that can be held in the pool.

In summary, the `Object Pool` module helps optimize resource management by reusing objects, which enhances performance and reduces the overhead associated with object creation and garbage collection.


### Renderer
The `Renderer` module is responsible for rendering visual elements of the game and managing scenes. It integrates with graphical libraries to display game content on the screen. This module provides functionality for:

- **Rendering Scenes**: Perform the rendering process to display scenes and their elements.
- **Managing Scenes**: Add, remove, and switch between different scenes in the game.
- **Integrating with HTML**: Attach the rendering canvas or display area to a specific HTML element.

#### Key Components
- **`IRenderer`**: The main interface for rendering, which includes methods to render the current scene and append the renderer to an HTML element.
- **`ISceneManager`**: Manages scenes within the renderer, allowing for adding, removing, and changing scenes.
- **`BasicScene`**: An abstract class representing a basic scene, with methods for handling scene mounting and unmounting.

In summary, the `Renderer` module handles the visual output of the game, ensuring that scenes are displayed correctly and providing mechanisms to manage and switch between different scenes.


## Systems
The `Systems` module is responsible for executing and managing game logic that operates on entities and components. Systems handle various aspects of the game's behavior and update the state of entities based on their components. This module provides functionality for:

- **Defining Systems**: Create systems that encapsulate specific game logic, with control over execution order via priorities.
- **Managing Systems**: Register and manage multiple systems, ensuring that they are updated and executed as part of the game loop.

#### Key Components
- **`System`**: An abstract class representing a system that contains a name, priority, and a method for computing updates based on the game world. Systems can be prioritized to control their execution order.
- **`ISystemsManager`**: An interface for managing systems, including methods for registering new systems and computing their updates within the game world.

In summary, the `Systems` module coordinates the execution of game logic and updates, allowing for organized and prioritized processing of different aspects of the game.


### Timer
The `Timer` module manages time-related functionality within the game. It provides mechanisms for tracking elapsed time, managing frame updates, and scheduling recurring callbacks. This module is essential for handling game time and updating game logic based on time intervals. Key features include:

- **Tracking Time**: Keep track of elapsed time, delta time between frames, and the time of the last update.
- **Scheduling Callbacks**: Register callbacks to be executed on each timer tick, allowing periodic tasks and updates.
- **Controlling Timer State**: Start, stop, and reset the timer to control its operation and ensure accurate time tracking.

#### Key Components
- **`TimerCallbackType`**: A type alias for callback functions that are executed on each timer tick.
- **`Timer`**: A class that provides methods to start, stop, and update the timer, as well as manage callbacks and track time.

In summary, the `Timer` module facilitates time management and periodic updates, making it crucial for implementing smooth and consistent game behavior based on time.


### World
The `World` module acts as the central hub for managing the game's components, systems, events, and timer. It coordinates interactions between various game elements and controls the overall game lifecycle. This module provides essential functionality for:

- **Managing Game Components**: Access and manage component storage and configurations.
- **Handling Systems**: Register and execute game systems responsible for processing game logic.
- **Event Management**: Facilitate event emission and subscription to enable communication between different parts of the game.
- **Time Management**: Track and control game time using the `Timer` class.
- **Game Lifecycle Control**: Start, update, pause, reset, and render the game world, ensuring smooth game execution and rendering.

#### Key Components
- **`IComponentsManager`**: Manages component storage and operations.
- **`ISystemsManager`**: Manages the game's systems and their execution.
- **`IEventManager`**: Handles event emission and subscription.
- **`Timer`**: Tracks and manages time within the game.
- **`newId()`**: Generates a new unique identifier for entities.
- **`start()`**: Initializes and starts the game world.
- **`update()`**: Updates the game world state based on the current time and system logic.
- **`pause()`**: Pauses the game world, halting updates and rendering.
- **`reset()`**: Resets the game world to its initial state.
- **`render()`**: Renders the current state of the game world to the screen.

In summary, the `World` module serves as the core management layer for the game, integrating components, systems, events, and time management to control and update the game environment effectively.
