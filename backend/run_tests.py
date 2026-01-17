#!/usr/bin/env python3
"""
=========================================================
LEGALGRAM 2.0 - TEST RUNNER
=========================================================
Runs all tests with comprehensive reporting.
Target: 10,000+ test cases
=========================================================
"""

import subprocess
import sys
import os
from datetime import datetime

def run_tests():
    """Run the complete test suite"""
    
    print("\n" + "=" * 70)
    print("🧪 LEGALGRAM 2.0 - COMPREHENSIVE TEST SUITE")
    print("=" * 70)
    print(f"📅 Started: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}")
    print("=" * 70 + "\n")
    
    # Change to backend directory
    backend_dir = os.path.dirname(os.path.abspath(__file__))
    os.chdir(backend_dir)
    
    # Install test dependencies
    print("📦 Installing test dependencies...")
    subprocess.run([
        sys.executable, "-m", "pip", "install", "-q",
        "pytest", "pytest-cov", "pytest-xdist", "httpx"
    ], check=True)
    
    # Run tests with coverage
    print("\n🚀 Running tests...\n")
    
    result = subprocess.run([
        sys.executable, "-m", "pytest",
        "tests/",
        "-v",
        "--tb=short",
        "--durations=20",
        "-x",  # Stop on first failure for faster debugging
        "--cov=.",
        "--cov-report=term-missing",
        "--cov-report=html:coverage_report",
    ])
    
    print("\n" + "=" * 70)
    if result.returncode == 0:
        print("✅ ALL TESTS PASSED!")
    else:
        print("❌ SOME TESTS FAILED")
    print("=" * 70)
    print(f"📅 Completed: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}")
    print("📊 Coverage report: coverage_report/index.html")
    print("=" * 70 + "\n")
    
    return result.returncode


def count_tests():
    """Count total number of test cases"""
    import ast
    
    test_count = 0
    test_dir = os.path.join(os.path.dirname(__file__), "tests")
    
    for filename in os.listdir(test_dir):
        if filename.startswith("test_") and filename.endswith(".py"):
            filepath = os.path.join(test_dir, filename)
            with open(filepath, 'r') as f:
                try:
                    tree = ast.parse(f.read())
                    for node in ast.walk(tree):
                        # Count test functions
                        if isinstance(node, ast.FunctionDef) and node.name.startswith("test_"):
                            # Check for parametrize decorators
                            param_count = 1
                            for decorator in node.decorator_list:
                                if isinstance(decorator, ast.Call):
                                    if hasattr(decorator.func, 'attr') and decorator.func.attr == 'parametrize':
                                        # Estimate parameter count
                                        for arg in decorator.args:
                                            if isinstance(arg, ast.List):
                                                param_count *= len(arg.elts)
                                            elif isinstance(arg, ast.Call) and hasattr(arg.func, 'id') and arg.func.id == 'range':
                                                if arg.args:
                                                    if isinstance(arg.args[0], ast.Constant):
                                                        param_count *= arg.args[0].value
                            test_count += param_count
                except:
                    pass
    
    return test_count


if __name__ == "__main__":
    print(f"\n📊 Estimated test cases: {count_tests()}")
    sys.exit(run_tests())
