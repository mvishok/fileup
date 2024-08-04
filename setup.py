from setuptools import setup, find_packages

setup(
    name="fileup",
    version="0.1.0",
    description="A Python package that simplifies the auto-update process by updating individual files with remote versions based on file-specific version comments.",
    author="Vishok M",
    author_email="hello@vishok.me",
    url="https://github.com/mvishok/fileup",
    packages=find_packages(),
    install_requires=[
        "requests",
    ],
    entry_points={
        'console_scripts': [
            'fileup=fileup.updater:update',
        ],
    },
    classifiers=[
        "Programming Language :: Python :: 3",
        "License :: OSI Approved :: MIT License",
        "Operating System :: OS Independent",
    ],
    python_requires='>=3.6',
)
