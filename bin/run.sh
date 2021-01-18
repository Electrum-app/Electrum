#!/bin/bash
#SBATCH --time=168:00:00
#SBATCH --nodes=1
#SBATCH -o /uufs/chpc.utah.edu/common/home/u0690617/slurmjob-%j
#SBATCH --account=rutter-gpu-np
#SBATCH --partition=rutter-gpu-np
#SBATCH --gres=gpu:2080ti:4
#SBATCH --mem=0

# Rutter lab GPU node specs
# - 40 cores
# - 192 GB of memory
# - 4x RTX2080TI GPUs

# Note: Change --gres command to up to `:4` to gain access to all 4 GPUs on node
# Note: --mem=0 reserves all node memory for the current job
# See https://www.chpc.utah.edu/documentation/guides/gpus-accelerators.php for more information on options
echo "+ Checking CUDA devices..."
echo "Devices: $CUDA_VISIBLE_DEVICES"
nvidia-smi -L

# Activate conda environment
# conda create -n substructure
# conda activate substructure
# conda install -c nvidia -c rapidsai -c numba -c conda-forge -c defaults cugraph cudatoolkit=11.0
# conda install python networkx pysmiles numpy pandas requests
source /uufs/chpc.utah.edu/common/home/u0690617/miniconda3/etc/profile.d/conda.sh
source activate substructure

# Set instance variables
HOME=/uufs/chpc.utah.edu/common/home/u0690617
SCRUSER=/scratch/general/lustre/u0690617
cd $SCRDIR
mkdir -r $SCRDIR/output

# Get main script
mkdir -r $SCRDIR/bin
cp $HOME/Electrum/bin/__main__.py $SCRDIR/bin

# Download HDMB database
cd $SCRDIR

# Run python script
python $SCRDIR/bin/__main__.py $SCRDIR/output
