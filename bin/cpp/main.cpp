// main.cpp
#include "sdf_reader.hpp" // SDF container
#include <string>
using namespace std;

// Set test variables 
string test_file = "C:\\Users\\jorda\\Desktop\\projects\\Electrum\\bin\\cpp\\test\\HMDB0000243.sdf";

// /////////////////
// Process SDF files
// /////////////////
// Input: .txt file with list of SDF files to download and process
// Output: .txt file with substructure annotation database
int main() {

    // Read in list of SDF files to process 

    // For each SDF file, read in data and return SDF container 
    readSDF(test_file);

    // Annotate sub-structures

    // Output sub-structure annotations


    return 0;
}


