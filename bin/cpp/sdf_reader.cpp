// sdf_reader.cpp
#include "sdf_reader.hpp" // SDF container
#include <iostream>
#include <fstream>
#include <string>
using namespace std;

// Process SDF file 
void readSDF(string file_name) {

    SDF newMolecule;
    cout << "Processing molecule ..." << endl;

    fstream this_file;
    this_file.open(file_name, ios::in); //open a file to perform read operation using file object
    if (this_file.is_open()) { //checking whether the file is open
        string _line;
        while (getline(this_file, _line)) { //read data from file object and put it into string.
            newMolecule.getHmdb(this_file, _line);
            newMolecule.getName(this_file, _line);
            newMolecule.getJchem(this_file, _line);
            newMolecule.getSynonyms(this_file, _line);
        }
        this_file.close(); //close the file object.
    }

    // 

    cout << "hello" << endl;
    cout << newMolecule.synonyms.size() << endl;
    for (int i = 0; i < newMolecule.synonyms.size(); i++){
        cout << i << endl;
        cout << newMolecule.synonyms[i] << endl;
    }
    cout << "goodbye" << endl;
}
