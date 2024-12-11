import os

def create_project_structure():
    base_dir = "random-challenge-app"

    # Define the directory structure
    structure = {
        base_dir: [
            "app",
            "migrations",
            "instance",
            "tests"
        ],
        f"{base_dir}/app": [
            "__init__.py",
            "routes.py",
            "models.py",
            "forms.py",
            "templates",
            "static"
        ],
        f"{base_dir}/app/templates": [
            "base.html",
            "index.html",
            "challenge.html",
            "history.html"
        ],
        f"{base_dir}/app/static": [
            "css",
            "js"
        ],
        f"{base_dir}/app/static/css": [
            "style.css"
        ],
        f"{base_dir}/app/static/js": [
            "main.js"
        ],
        f"{base_dir}/instance": [
            "config.py"
        ],
        f"{base_dir}/tests": [
            "test_routes.py"
        ]
    }

    # Create directories and files
    for directory, contents in structure.items():
        os.makedirs(directory, exist_ok=True)
        for content in contents:
            if "." in content:  # It's a file
                with open(os.path.join(directory, content), 'w') as f:
                    if content.endswith(".py"):
                        f.write("# Placeholder for Python file\n")
                    elif content.endswith(".html"):
                        f.write("<!-- Placeholder for HTML file -->\n")
                    elif content.endswith(".css"):
                        f.write("/* Placeholder for CSS file */\n")
                    elif content.endswith(".js"):
                        f.write("// Placeholder for JavaScript file\n")
                    elif content.endswith(".config"):
                        f.write("# Placeholder for config file\n")

    # Create top-level files
    top_level_files = ["requirements.txt", "config.py", "run.py", "README.md"]
    for file in top_level_files:
        with open(os.path.join(base_dir, file), 'w') as f:
            if file == "README.md":
                f.write("# Random Challenge App\n\nA simple Flask app to generate random challenges.\n")
            else:
                f.write("# Placeholder for top-level file\n")

    print(f"Project structure created in {base_dir}/")

# Run the function
create_project_structure()