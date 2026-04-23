# Sorting Visualizer

This project has been simplified to use fewer files and folders.

## Main Files

```text
sorting-visualizer/
├── package.json
├── public/
│   └── index.html
└── src/
    ├── App.js
    ├── App.css
    ├── index.js
    └── sorting.cpp
```

## Run React UI

```bash
npm install
npm start
```

## Compile C++ File

```bash
c++ -std=c++17 src/sorting.cpp -o sorting_visualizer_cpp
./sorting_visualizer_cpp
```
