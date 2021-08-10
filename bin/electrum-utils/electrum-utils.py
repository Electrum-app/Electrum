"""License Information
electrum-utils
Back-end utils tool for Electrum
https://github.com/Electrum-app/Electrum/
alias: electrum-utils

Copyright (C) 2020-2021 Jordan A. Berg
Email: jordan<dot>berg<at>biochem<dot>utah<dot>edu

This program is free software: you can redistribute it and/or modify it under
the terms of the GNU General Public License as published by the Free Software
Foundation, either version 3 of the License, or (at your option) any later
version.

This program is distributed in the hope that it will be useful, but WITHOUT ANY
WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A
PARTICULAR PURPOSE. See the GNU General Public License for more details.
You should have received a copy of the GNU General Public License along with
this program.  If not, see <https://www.gnu.org/licenses/>.
"""
from __future__ import print_function
from textwrap import dedent
import argparse
import sys
import os


__version__ = "0.0.1-alpha"
__path__ = os.path.dirname(
    os.path.realpath(
        __file__
        )
    )


"""Internal dependencies 
"""
from make_entity_dictionary.__main__ import __main__ as makeEntityDictionary
from make_structure_dictionary.__main__ import __main__ as makeStructureDictionary
from make_heatmap.__main__ import __main__ as makeRadialGuide


"""Functions 
"""
def parse_args(
        args, 
        __version__):
    """Parse sub-module and arguments for electrum-utils command
    """

    description_table = """\
    The electrum-utils sub-modules can be accessed by executing:
        'electrum-utils.py sub-module_name arg1 arg2 ...'
    Sub-module help can be displayed by executing:
    'electrum-utils sub-module_name --help'
    Sub-module descriptions:
        +---------------------------------+---------------------------------------------------+
        |   buildEntityReference          |   Build metabolite and protein reference files    |
        +-----------------------+-------------------------------------------------------------+
        |   buildSubstructureReference    |   Build metabolite substructure reference files   |
        +---------------------------------+---------------------------------------------------+
        |   buildRadialGuide              |   Build radial position guide for metabolites     |
        +---------------------------------+---------------------------------------------------+
    """

    license_info = """\

    License Information:
    
    electrum-utils

    Back-end utils tool for Electrum
    https://github.com/Electrum-app/Electrum/
    alias: electrum-utils

    Copyright (C) 2020-2021 Jordan A. Berg
    Email: jordan<dot>berg<at>biochem<dot>utah<dot>edu

    This program is free software: you can redistribute it and/or modify it under
    the terms of the GNU General Public License as published by the Free Software
    Foundation, either version 3 of the License, or (at your option) any later
    version.

    This program is distributed in the hope that it will be useful, but WITHOUT ANY
    WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A
    PARTICULAR PURPOSE. See the GNU General Public License for more details.
    You should have received a copy of the GNU General Public License along with
    this program.  If not, see <https://www.gnu.org/licenses/>.
    """
    
    
    # Require user input
    if args is None:
        args = sys.argv[1:]

    # Initialize main parser
    parser = argparse.ArgumentParser(
        prog='electrum-utils',
        description=dedent(description_table),
        formatter_class=argparse.RawTextHelpFormatter)

    # Optional main arguments
    parser.add_argument(
        '-v', '--version',
        help='Display version',
        action='version',
        version='%(prog)s ' + str(__version__))
    parser.add_argument(
        '-l', '--license',
        help='Print license information',
        action='version',
        version=dedent(license_info))

    # Add sub-parsers
    subparser = parser.add_subparsers(dest='cmd')


    # buildEntityReference parser
    entity_parser = subparser.add_parser(
        'buildEntityReference',
        description='Build metabolite and protein reference files',
        add_help=False)

    # buildEntityReference required arguments
    entity_reqs = entity_parser.add_argument_group('required arguments')
    entity_reqs.add_argument(
        '-d', '--database',
        help='Path and filename of MIDAS interaction database (must be tab-delimited)',
        metavar='<path/filename.txt>',
        type=str,
        required=True)
    entity_reqs.add_argument(
        '-o', '--output',
        help='Path to output directory (default: current working directory)',
        metavar='<path>',
        type=str,
        required=True)
    

    # buildSubstructureReference parser
    substructure_parser = subparser.add_parser(
        'buildSubstructureReference',
        description='Build metabolite substructure reference files',
        add_help=False)

    # buildSubstructureReference required arguments
    substructure_reqs = substructure_parser.add_argument_group('required arguments')
    substructure_reqs.add_argument(
        '-d', '--database',
        help='Path and filename of MIDAS interaction database (must be tab-delimited)',
        metavar='<path/filename.txt>',
        type=str,
        required=True)
    substructure_reqs.add_argument(
        '-o', '--output',
        help='Path to output directory (default: current working directory)',
        metavar='<path>',
        type=str,
        required=True)

    # buildRadialGuide parser
    radial_parser = subparser.add_parser(
        'buildRadialGuide',
        description='Build radial metabolite placement guide files',
        add_help=False)

    # buildSubstructureReference required arguments
    radial_reqs = radial_parser.add_argument_group('required arguments')
    radial_reqs.add_argument(
        '-d', '--database',
        help='Path and filename of MIDAS interaction database (must be tab-delimited)',
        metavar='<path/filename.txt>',
        type=str,
        required=True)
    radial_reqs.add_argument(
        '-o', '--output',
        help='Path to output directory (default: current working directory)',
        metavar='<path>',
        type=str,
        required=True)
    

    # Get arguments are print help if no arguments provided
    if len(sys.argv[1:]) == 0:
        parser.print_help()
        parser.exit()

    # Parse arguments into NameSpace
    args = parser.parse_args(args)

    # Collect subargs and package, add metaboverse script path to parameter dictionary
    args_dict = vars(args)
    args_dict['path'] = str(__path__)
    if not args_dict['path'].endswith(os.path.sep):
        args_dict['path'] = args_dict['path'] + os.path.sep

    for k, v in args_dict.items():
        if os.path.isdir(os.path.abspath(v)) \
        or os.path.isfile(os.path.abspath(v)):
            args_dict[k] = os.path.abspath(v)

    return args, args_dict


def main(
        args=None):
    """Run metaboverse-cli
    """

    args, args_dict = parse_args(
        args,
        __version__)

    print("\nArguments:")
    for k, v in args_dict.items():
        print(k + ": ", v)

    if args_dict['cmd'] == 'buildEntityReference':
        print("\n-> Running buildEntityReference sub-module\n")
        makeEntityDictionary(args_dict)
    elif args_dict['cmd'] == 'buildSubstructureReference':
        print("\n-> Running buildSubstructureReference sub-module\n")
        makeStructureDictionary(args_dict)
    elif args_dict['cmd'] == 'buildRadialGuide':
        print("\n-> Running buildRadialGuide sub-module\n")
        makeRadialGuide(args_dict)
    else:
        raise Exception('Invalid sub-module selected')


""" Main process
"""
if __name__ == '__main__':
    """Run main
    """
    sys.exit(main() or 0)