// indexedDB: Reforzamiento

//1.Open the db space
//let openRequest = indexedDB.open(name, version);
let openRequest = indexedDB.open("my-db", 1);

// is updated when a db version is created/upgraded => Creating or updating the version of the db
// the onupgradeneeded event will be triggered and an IDBVersionChangeEvent object will be passed
// to any onversionchange event handler set up on request.result
openRequest.onupgradeneeded = (event) => {
  console.log("update db");

  //to obtain the reference to the db => Save the IDBDAtabase interface
  let db = event.target.result;

  // Create an objectStore to hold information about our heroes. We're
  // going to use the keyPath 'id' as our key path because it's guaranteed to be
  // unique => this key will be mandatory to enter any record or change in the database
  if (!db.objectStoreNames.contains("heroes")) {
    db.createObjectStore("heroes", { keyPath: "id" });
  }
};

// ERRORS HANDLING FOR OPENING THE DB
openRequest.onerror = (event) => {
  console.log("IndexedDB Error", event.target.error);
};

// SUCCES HANDLER FOR OPENING THE DB
openRequest.onsuccess = (event) => {
  let db = event.target.result;

  //creation of an array of what we want to INSERT into the local database
  let heroesData = [
    {
      id: "1111",
      hero: "Thor",
      message: "Good morning! It is very cold there",
    },
    {
      id: "2222",
      hero: "Bad-Girl",
      message:
        "You're right. You will have to warm up by beating each other up",
    },
  ];

  // begin a  transaction that that allows to read and write
  let heroesTransaction = db.transaction(["heroes"], "readwrite");

  // transaction error handling
  heroesTransaction.onerror = (event) => {
    console.log("Transaction Error", event.target.error);
  };

  // report on the success of the transacton when the transaction is completed
  heroesTransaction.oncomplete = (event) => {
    console.log("Transaction completed succesfully!", event);
  };
  //acces the object from the transition
  let heroesStore = heroesTransaction.objectStore("heroes");

  //to make the insertions in the db:
  heroesData.forEach((hero) => {
    let request = heroesStore.add(hero); //to add each item

    request.onsuccess = (event) => {
      console.log(`Hero ${hero.hero} added successfully!`, event);
    };

    request.onerror = (event) => {
      console.error(`Failed to add hero ${hero.hero}:`, event.target.error);
    };
  });
};

// // Open the db space
// let openRequest = indexedDB.open("my-db", 1);

// // Event handler for upgrading the database
// openRequest.onupgradeneeded = (event) => {
//   console.log("Updating DB...");

//   let db = event.target.result;

//   // Check if the object store already exists (to avoid errors in case of re-opening)
//   if (!db.objectStoreNames.contains("heroes")) {
//     // Create object store with 'id' as the keyPath
//     let objectStore = db.createObjectStore("heroes", { keyPath: "id" });
//   }
// };

// // Error handler for opening the database
// openRequest.onerror = (event) => {
//   console.error("IndexedDB Error:", event.target.error);
// };

// // Success handler for opening the database
// openRequest.onsuccess = (event) => {
//   let db = event.target.result;

//   // Create data to insert
//   let heroesData = [
//     {
//       id: "1111",
//       hero: "Thor",
//       message: "Good morning! It is very cold there",
//     },
//     {
//       id: "2222",
//       hero: "Bad-Girl",
//       message:
//         "You're right. You will have to warm up by beating each other up",
//     },
//   ];

//   // Begin a transaction (readwrite)
//   let heroesTransaction = db.transaction("heroes", "readwrite");

//   // Handle errors in the transaction
//   heroesTransaction.onerror = (event) => {
//     console.error("Transaction Error:", event.target.error);
//   };

//   // When the transaction is completed
//   heroesTransaction.oncomplete = (event) => {
//     console.log("Transaction completed successfully!");
//   };

//   // Access the object store from the transaction
//   let heroesStore = heroesTransaction.objectStore("heroes");

//   // Insert each hero into the store
//   heroesData.forEach((hero) => {
//     let request = heroesStore.add(hero); // Add each item

//     // Optionally handle each insert success or failure
//     request.onsuccess = (event) => {
//       console.log(`Hero ${hero.hero} added successfully!`);
//     };

//     request.onerror = (event) => {
//       console.error(`Failed to add hero ${hero.hero}:`, event.target.error);
//     };
//   });
// };
