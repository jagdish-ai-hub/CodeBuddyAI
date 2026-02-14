
import { LanguageCourse } from './types';

export const COURSES: LanguageCourse[] = [
  {
    id: 'python',
    name: 'Python',
    icon: '🐍',
    color: 'bg-green-100 text-green-700 border-green-200',
    description: 'A friendly, readable language great for beginners.',
    chapters: [
      {
        id: 'py-1',
        title: 'What is Python?',
        definition: 'Python is a high-level programming language known for its simplicity. Unlike other languages that require complex symbols, Python reads almost like English. It handles the messy background work for you, letting you focus purely on solving problems and building logic.',
        whyItMatters: 'It is the language of choice for Artificial Intelligence, NASA data analysis, and backend web development (like Instagram).',
        keyPoints: [
            'Readability: Uses clear English keywords.',
            'Interpreted: Runs code line-by-line immediately.',
            'Versatile: Builds websites, analyzes data, and powers AI.'
        ],
        sampleCode: '# Python code looks clean\nprint("Hello, World!")\nprint("Coding is fun.")',
        commonMistakes: ['Forgetting the parentheses () in print calls.', 'Using uppercase P for print (Python is case-sensitive).'],
        practiceQuestion: {
          question: 'Write a line of code to print your name to the screen.',
          starterCode: '# Type your code below\n',
          hint: 'Use the print() function with quotes.',
          validationRegex: /print\s*\(/
        }
      },
      {
        id: 'py-2',
        title: 'Variables',
        definition: 'Think of a variable as a labeled storage box. You can put data inside this box and write the label name on the outside. Whenever you need that data later in your program, you just refer to the box by its name. In Python, you do not need to specify the type of data beforehand.',
        whyItMatters: 'Without variables, programs would be static and useless. They allow software to remember user names, scores, and choices.',
        keyPoints: [
            'Assignment: Use the = sign to put data in the box.',
            'Naming: Use descriptive names (e.g., user_score, not x).',
            'Dynamic: A variable can hold a number, then later hold text.'
        ],
        sampleCode: 'player_name = "Alex"\nscore = 100\nprint(player_name)',
        commonMistakes: ['Putting spaces in variable names (use_underscores).', ' confusing variable name with text strings (missing quotes).'],
        practiceQuestion: {
          question: 'Create a variable named "age" and set it to 10.',
          starterCode: '# Create your variable here\n',
          hint: 'Format: variable_name = value',
          validationRegex: /age\s*=\s*10/
        }
      },
      {
        id: 'py-3',
        title: 'Data Types',
        definition: 'In the physical world, we have different types of objects: liquids, solids, gases. In coding, data has "types" too. Python needs to know if a value is text (String), a whole number (Integer), or a decimal (Float) so it knows how to treat it. For example, you can do math on Integers, but not on text.',
        whyItMatters: 'Mixing types causes errors. You cannot subtract "Apple" from 50. Understanding types prevents crashes.',
        keyPoints: [
            'String (str): Text inside quotes "Hello".',
            'Integer (int): Whole numbers like 5, -10.',
            'Float: Decimals like 3.14, 2.5.'
        ],
        sampleCode: 'name = "Dog" # String\nlegs = 4 # Integer\nspeed = 12.5 # Float',
        commonMistakes: ['Adding a number to a string without converting it first.', 'Using quotes around numbers when you want to do math.'],
        practiceQuestion: {
          question: 'Create a string variable named "fruit" with the value "Apple".',
          starterCode: '',
          hint: 'Remember to use quotes for text.',
          validationRegex: /fruit\s*=\s*["']Apple["']/
        }
      },
      {
        id: 'py-4',
        title: 'Input & Output',
        definition: 'Input is how your program listens to the world (getting data from the user). Output is how it speaks back (showing results on the screen). This two-way communication turns a static script into an interactive application.',
        whyItMatters: 'Interaction is the heart of software. Whether it is a game controller or a login form, input and output make it happen.',
        keyPoints: [
            'input(prompt): Pauses program to get text from user.',
            'print(value): Displays text to the console.',
            'Data coming from input() is ALWAYS a string.'
        ],
        sampleCode: 'name = input("What is your name? ")\nprint("Hello " + name)',
        commonMistakes: ['Forgetting that input() returns text, even if the user types a number.'],
        practiceQuestion: {
          question: 'Ask the user for their favorite color and store it in a variable called "color".',
          starterCode: '',
          hint: 'Use the input() function.',
          validationRegex: /color\s*=\s*input\(/
        }
      },
      {
        id: 'py-5',
        title: 'Comments',
        definition: 'Comments are notes written by programmers for other programmers (or their future selves). The computer completely ignores them when running the code. They are used to explain complex logic, leave reminders, or temporarily disable code.',
        whyItMatters: 'Code is read humans more often than it is written. Good comments make your code maintainable and professional.',
        keyPoints: [
            'Syntax: Start the line with a hash symbol #.',
            'Usage: Explain "why" you did something, not just "what".',
            'Debugging: "Comment out" code to test if it is causing errors.'
        ],
        sampleCode: '# This calculates area (Computer ignores this)\narea = 5 * 5',
        commonMistakes: ['Thinking the computer reads comments.', 'Over-commenting obvious code.'],
        practiceQuestion: {
          question: 'Write a comment that says "My First Code".',
          starterCode: '',
          hint: 'Start the line with a hash symbol #',
          validationRegex: /#\s*My First Code/i
        }
      },
      {
        id: 'py-6',
        title: 'If / Else Logic',
        definition: 'Programs need to make decisions. An "If" statement is like a fork in the road. If a condition is true (e.g., "is it raining?"), the program takes one path ("take umbrella"). If not, it takes the "Else" path ("wear sunglasses").',
        whyItMatters: 'This allows your app to react differently to different users, scores, or data input.',
        keyPoints: [
            'Syntax: if condition: (don\'t forget the colon!).',
            'Indentation: The code to run MUST be indented.',
            'Else: Runs only if the "if" part was false.'
        ],
        sampleCode: 'age = 10\nif age > 18:\n  print("Adult")\nelse:\n  print("Kid")',
        commonMistakes: ['Forgetting the colon : at the end of the line.', 'Not indenting the print statements inside the block.'],
        practiceQuestion: {
          question: 'Write an if statement checking if "score" is greater than 50.',
          starterCode: 'score = 75\n',
          hint: 'Use if score > 50:',
          validationRegex: /if\s+score\s*>\s*50\s*:/
        }
      },
      {
        id: 'py-7',
        title: 'Basic Loops',
        definition: 'Imagine having to write "print(number)" 100 times. That is tedious! Loops allow you to repeat a block of code multiple times automatically. You can loop a specific number of times (For Loop) or until a condition changes (While Loop).',
        whyItMatters: 'Automation is the superpower of coding. Loops allow computers to process millions of data points in seconds.',
        keyPoints: [
            'For Loop: Best for counting or iterating items.',
            'Range(x): Creates a sequence of numbers from 0 to x-1.',
            'Efficiency: Write code once, run it infinitely.'
        ],
        sampleCode: 'for i in range(5):\n  print("Count:", i)',
        commonMistakes: ['Creating infinite loops that crash the browser.', 'Forgetting that range(5) stops at 4, not 5.'],
        practiceQuestion: {
          question: 'Write a loop that prints numbers 0 to 4 using range(5).',
          starterCode: '',
          hint: 'Start with: for i in range(5):',
          validationRegex: /for\s+\w+\s+in\s+range\s*\(\s*5\s*\)\s*:/
        }
      },
      {
        id: 'py-8',
        title: 'Lists',
        definition: 'A list is a single variable that holds multiple items. Imagine a shopping list: instead of creating variables like "item1", "item2", "item3", you just have one list called "shopping". You can access items by their position (index).',
        whyItMatters: 'Lists organize related data. They are essential for things like feeds, high score boards, and inventory systems.',
        keyPoints: [
            'Brackets: Define lists with [ ].',
            'Index: Counting starts at 0. First item is list[0].',
            'Mixed Types: Python lists can hold numbers and strings together.'
        ],
        sampleCode: 'fruits = ["Apple", "Banana"]\nprint(fruits[0]) # Prints Apple',
        commonMistakes: ['Trying to access an index that doesn\'t exist (IndexError).', 'Forgetting counting starts at 0.'],
        practiceQuestion: {
          question: 'Create a list named "numbers" containing 1, 2, and 3.',
          starterCode: '',
          hint: 'Use square brackets: [1, 2, 3]',
          validationRegex: /numbers\s*=\s*\[\s*1\s*,\s*2\s*,\s*3\s*\]/
        }
      },
      {
        id: 'py-9',
        title: 'Functions',
        definition: 'A function is a reusable "recipe" of code. You define it once, give it a name, and then you can "call" (use) it as many times as you want. This prevents you from copying and pasting the same code over and over.',
        whyItMatters: 'Functions keep your code clean, organized, and modular. If you need to fix a bug, you only fix it in one place.',
        keyPoints: [
            'Define: Use "def name():" to create it.',
            'Call: Use "name()" to run it.',
            'Parameters: You can pass data into functions to customize them.'
        ],
        sampleCode: 'def say_hi(name):\n  print("Hi " + name)\n\nsay_hi("CodeBuddy")',
        commonMistakes: ['Defining a function but never calling it.', 'Forgetting the parentheses when calling.'],
        practiceQuestion: {
          question: 'Define a function named "greet" that prints "Hello".',
          starterCode: '',
          hint: 'Start with def greet():',
          validationRegex: /def\s+greet\s*\(\s*\)\s*:/
        }
      },
      {
        id: 'py-10',
        title: 'Project: Secret Password',
        definition: 'Let\'s combine Input, If/Else, and Output logic. We will create a simple security system that asks for a password and decides whether to grant access or deny it. This mimics real-world authentication logic.',
        whyItMatters: 'Putting concepts together is how you build real software. This is your first step toward building complex apps.',
        keyPoints: [
            'Step 1: Get input.',
            'Step 2: Check input with If.',
            'Step 3: Print result.',
            'Test: Try entering both correct and incorrect passwords.'
        ],
        sampleCode: 'password = input("Enter password: ")\nif password == "secret":\n  print("Access Granted")\nelse:\n  print("Access Denied")',
        commonMistakes: ['Using = (assignment) instead of == (comparison).'],
        practiceQuestion: {
          question: 'Write code that asks for a password. If it is "secret", print "Access Granted".',
          starterCode: '',
          hint: 'Combine input() and if/else',
          expectedKeywords: ['input', 'if', 'secret', 'print']
        }
      },
      {
        id: 'py-11',
        title: 'Dictionaries',
        definition: 'A Dictionary is a data structure that stores data in key-value pairs, just like a real dictionary where you look up a word (Key) to find its definition (Value). Unlike lists which use numbers for indexes, dictionaries allow you to use custom labels.',
        whyItMatters: 'They are incredibly fast for looking up data. They are the backbone of databases and JSON APIs.',
        keyPoints: [
            'Syntax: { "key": "value" }',
            'Access: dict["key"] retrieves the value.',
            'Unique Keys: You cannot have duplicate keys.'
        ],
        sampleCode: 'student = { "name": "Sam", "age": 12 }\nprint(student["name"])',
        commonMistakes: ['Trying to access a key that does not exist (KeyError).', 'Using duplicate keys.'],
        practiceQuestion: {
          question: 'Create a dictionary named "person" with "name" set to "Alex".',
          starterCode: '',
          hint: 'person = { "name": "Alex" }',
          validationRegex: /person\s*=\s*\{\s*["']name["']\s*:\s*["']Alex["']\s*\}/
        }
      },
      {
        id: 'py-12',
        title: 'While Loops',
        definition: 'A While Loop keeps running as long as a certain condition is true. It is like saying "Keep eating until you are full". If the condition never becomes false, the loop runs forever (infinite loop).',
        whyItMatters: 'Used when you don\'t know how many times you need to loop, like waiting for a user to type the correct password.',
        keyPoints: [
            'Syntax: while condition:',
            'Update: You must change the variable inside the loop to avoid infinite loops.',
            'Logic: Checks condition before every iteration.'
        ],
        sampleCode: 'count = 0\nwhile count < 3:\n  print(count)\n  count = count + 1',
        commonMistakes: ['Forgetting to increment the counter, causing a crash.'],
        practiceQuestion: {
          question: 'Write a while loop that runs while "x" is less than 5.',
          starterCode: 'x = 0\n',
          hint: 'while x < 5:',
          validationRegex: /while\s+x\s*<\s*5\s*:/
        }
      },
      {
        id: 'py-13',
        title: 'Error Handling (Try/Except)',
        definition: 'Programs crash when they hit unexpected errors (like dividing by zero). "Try/Except" allows you to catch these errors and handle them gracefully instead of crashing the entire program.',
        whyItMatters: 'Robust software never crashes. It tells the user "Something went wrong" and keeps running.',
        keyPoints: [
            'Try: Put risky code here.',
            'Except: Code that runs if an error happens.',
            'Safety: Prevents users from seeing ugly error messages.'
        ],
        sampleCode: 'try:\n  print(10 / 0)\nexcept:\n  print("Cannot divide by zero")',
        commonMistakes: ['Catching all errors without logging them.', 'Putting too much code inside the try block.'],
        practiceQuestion: {
          question: 'Wrap a print statement in a try/except block.',
          starterCode: '',
          hint: 'try:\n  ...\nexcept:\n  ...',
          validationRegex: /try\s*:.*except\s*:/s
        }
      },
      {
        id: 'py-14',
        title: 'Modules & Libraries',
        definition: 'Python comes with "batteries included". Modules are pre-written code files that you can import to do cool things like math, random number generation, or working with dates. You don\'t need to write everything from scratch.',
        whyItMatters: 'Modules allow you to build complex features (like a random dice roll) in one line of code.',
        keyPoints: [
            'Import: Use "import module_name".',
            'Usage: module_name.function()',
            'Standard Library: Python has hundreds of built-in modules.'
        ],
        sampleCode: 'import random\nprint(random.randint(1, 10))',
        commonMistakes: ['Importing a module that is not installed.', 'Misspelling the function name.'],
        practiceQuestion: {
          question: 'Import the "math" module.',
          starterCode: '',
          hint: 'import math',
          validationRegex: /import\s+math/
        }
      },
      {
        id: 'py-15',
        title: 'File Basics',
        definition: 'Software needs to save data. File handling allows Python to Create, Read, Update, and Delete (CRUD) files on your computer. This is how you save game progress or write logs.',
        whyItMatters: 'Data persistence. Without files (or databases), all data is lost when the program turns off.',
        keyPoints: [
            'Open: f = open("file.txt", "w")',
            'Write: f.write("Hello")',
            'Close: Always close() the file to save it.'
        ],
        sampleCode: 'f = open("test.txt", "w")\nf.write("Hello")\nf.close()',
        commonMistakes: ['Forgetting to close the file.', 'Using "w" (write) mode which overwrites existing content.'],
        practiceQuestion: {
          question: 'Write code to open "log.txt" in write mode "w".',
          starterCode: '',
          hint: 'open("log.txt", "w")',
          validationRegex: /open\s*\(\s*["']log\.txt["']\s*,\s*["']w["']\s*\)/
        }
      }
    ]
  },
  {
    id: 'java',
    name: 'Java',
    icon: '☕',
    color: 'bg-orange-100 text-orange-700 border-orange-200',
    description: 'Powerful and widely used for building large applications and Android apps.',
    chapters: [
      {
        id: 'java-1',
        title: 'Hello Java',
        definition: 'Java is a robust, object-oriented language used by large companies. Unlike Python, Java is very structured. Every line of code must live inside a "Class", and every program starts running from a "Main Method". It is verbose but very safe.',
        whyItMatters: 'It powers billions of devices, from Android phones to banking servers and Minecraft.',
        keyPoints: [
            'Structure: Code lives in class Main { ... }.',
            'Entry Point: public static void main(String[] args).',
            'Syntax: Statements must end with a semicolon ;.'
        ],
        sampleCode: 'public class Main {\n  public static void main(String[] args) {\n    System.out.println("Hello");\n  }\n}',
        commonMistakes: ['Missing semicolons at the end of lines.', 'Forgetting the main method structure.'],
        practiceQuestion: {
          question: 'Complete the print statement to say "Java".',
          starterCode: 'System.out.println("___");',
          hint: 'Replace ___ with Java',
          validationRegex: /System\.out\.println\s*\(\s*"Java"\s*\)\s*;/
        }
      },
      { 
        id: 'java-2', 
        title: 'Typed Variables', 
        definition: 'In Java, you must be explicit. If you want a box to hold a number, you must say "This box is for Integers only". You cannot put text in it later. This is called "Static Typing". It prevents many bugs before the code even runs.',
        whyItMatters: 'Strictness ensures reliability. The computer manages memory better when it knows exactly what type of data is coming.', 
        keyPoints: [
            'int: For whole numbers.',
            'double: For decimals.',
            'boolean: For true/false.',
            'Declaration: type variableName = value;'
        ], 
        sampleCode: 'int score = 100;\ndouble price = 9.99;\nboolean isFun = true;', 
        commonMistakes: ['Trying to put a decimal (10.5) into an int variable.', 'Forgetting the semicolon.'], 
        practiceQuestion: { 
            question: 'Create an integer variable named "count" equal to 5.', 
            starterCode: '', 
            hint: 'int count = 5;', 
            validationRegex: /int\s+count\s*=\s*5;/ 
        } 
      },
      { 
        id: 'java-3', 
        title: 'String Objects', 
        definition: 'In Java, a String is an "Object", not a primitive type like int. This means it has superpowers—methods built into it to do things like checking length or changing case. Strings must always be declared with a capital "S".',
        whyItMatters: 'Text processing is crucial for apps (names, messages, logs). Knowing String methods saves you from writing complex code.', 
        keyPoints: [
            'Capital S: String name = "Code";',
            'Double Quotes: Always use " " for Strings.',
            'Concatenation: Use + to join strings.'
        ], 
        sampleCode: 'String first = "Hello";\nString full = first + " World";', 
        commonMistakes: ['Using single quotes \' \' for Strings (Java uses them for characters).', 'Lower case \'s\' in String.'], 
        practiceQuestion: { 
            question: 'Define a String variable named "brand" with value "Java".', 
            starterCode: '', 
            hint: 'String brand = "Java";', 
            validationRegex: /String\s+brand\s*=\s*"Java";/ 
        } 
      },
      { 
        id: 'java-4', 
        title: 'If Statements', 
        definition: 'Java logic works similarly to other languages but requires parentheses around the condition and curly braces {} for the code block. This structure makes it clear exactly where the logic starts and ends.',
        whyItMatters: 'Controlling the flow of your application is essential for game rules, login checks, and data validation.', 
        keyPoints: [
            'Parentheses: if (condition)',
            'Braces: { code to run }',
            'Comparison: Use == for primitives, .equals() for Strings.'
        ], 
        sampleCode: 'int x = 10;\nif (x > 5) {\n  System.out.println("Big");\n}', 
        commonMistakes: ['Using = (assignment) instead of == inside the if condition.'], 
        practiceQuestion: { 
            question: 'Write an if statement checking if x is greater than 0.', 
            starterCode: 'int x=5;', 
            hint: 'if (x > 0) { ... }', 
            validationRegex: /if\s*\(\s*x\s*>\s*0\s*\)/ 
        } 
      },
      { 
        id: 'java-5', 
        title: 'For Loops', 
        definition: 'The standard Java For Loop is very explicit. You define a counter, a stopping condition, and how to update the counter all in one line. It gives you precise control over how many times code repeats.',
        whyItMatters: 'Used for processing arrays, counting, or running tasks a set number of times efficiently.', 
        keyPoints: [
            'Syntax: for(init; condition; update)',
            'Example: for(int i=0; i<10; i++)',
            'Scope: The variable i usually only exists inside the loop.'
        ], 
        sampleCode: 'for(int i=0; i<5; i++) {\n  System.out.println(i);\n}', 
        commonMistakes: ['Off-by-one errors (looping 1 time too many or too few).', 'Using commas instead of semicolons inside the for().'], 
        practiceQuestion: { 
            question: 'Write a loop header that runs as long as i is less than 10.', 
            starterCode: '', 
            hint: 'for(int i=0; i<10; i++)', 
            validationRegex: /for\s*\(\s*int\s+i\s*=\s*0\s*;\s*i\s*<\s*10\s*;\s*i\+\+\s*\)/ 
        } 
      },
      { 
        id: 'java-6', 
        title: 'Methods (Functions)', 
        definition: 'In Java, functions are called Methods. They must be defined inside a class. You need to specify what type of data the method returns (e.g., int, void, String). "Void" means it returns nothing.',
        whyItMatters: 'Methods help break complex problems into small, solvable, and reusable pieces.', 
        keyPoints: [
            'Return Type: Must be declared (void, int, etc.).',
            'Parameters: Must specify type (int x, String y).',
            'Visibility: usually public static for simple start.'
        ], 
        sampleCode: 'public static void sayHi() {\n  System.out.println("Hi");\n}', 
        commonMistakes: ['Forgetting to specify a return type.', 'Returning a String when the method is defined as int.'], 
        practiceQuestion: { 
            question: 'Create a method named test that returns nothing (void).', 
            starterCode: '', 
            hint: 'public static void test() { }', 
            validationRegex: /void\s+test\s*\(\s*\)/ 
        } 
      },
      { 
        id: 'java-7', 
        title: 'Arrays', 
        definition: 'Java Arrays are fixed-size containers. Once you create an array of size 5, it can never hold 6 items. Also, an int array can ONLY hold integers. This rigidity ensures high performance.',
        whyItMatters: 'Arrays are the building blocks of data structures. They are fast and efficient for storing lists of known size.', 
        keyPoints: [
            'Declaration: int[] numbers;',
            'Initialization: {1, 2, 3} or new int[5].',
            'Access: numbers[0] gets the first item.'
        ], 
        sampleCode: 'int[] nums = {10, 20, 30};\nSystem.out.println(nums[0]);', 
        commonMistakes: ['Trying to put a different type of data into the array.', 'Accessing index 5 in an array of size 5 (last index is 4).'], 
        practiceQuestion: { 
            question: 'Create an int array named "arr" containing 1 and 2.', 
            starterCode: '', 
            hint: 'int[] arr = {1, 2};', 
            validationRegex: /int\[\]\s+arr\s*=\s*\{\s*1\s*,\s*2\s*\};/ 
        } 
      },
      { 
        id: 'java-8', 
        title: 'Classes & Objects', 
        definition: 'Think of a Class as a blueprint (like for a house) and an Object as the actual house built from it. You can build many houses (Objects) from one blueprint (Class). This is the core of Object-Oriented Programming (OOP).',
        whyItMatters: 'OOP allows you to model real-world things (Users, Cars, BankAccounts) in code, keeping data and behavior together.', 
        keyPoints: [
            'Class: Defines attributes and behaviors.',
            'Object: An instance of the class.',
            'New: Use the "new" keyword to create an object.'
        ], 
        sampleCode: 'class Dog {\n  void bark() {\n    System.out.println("Woof");\n  }\n}', 
        commonMistakes: ['Forgetting the "new" keyword when creating an object.', 'Defining a class inside a method (not allowed).'], 
        practiceQuestion: { 
            question: 'Define a class named "Cat".', 
            starterCode: '', 
            hint: 'class Cat { }', 
            validationRegex: /class\s+Cat/ 
        } 
      },
      { 
        id: 'java-9', 
        title: 'While Loops', 
        definition: 'The While loop in Java works just like in other languages. It repeatedly executes a block of code as long as a boolean condition is true. It is useful when you do not know in advance how many times you need to loop.',
        whyItMatters: 'Essential for reading data streams, waiting for user input, or game loops.', 
        keyPoints: [
            'Syntax: while(condition) { }',
            'Condition: Must be a boolean expression.',
            'Danger: If the condition never changes, the loop runs forever.'
        ], 
        sampleCode: 'int i = 0;\nwhile(i < 5) {\n  System.out.println(i);\n  i++;\n}', 
        commonMistakes: ['Forgetting to update the loop variable (i++), creating an infinite loop.'], 
        practiceQuestion: { 
            question: 'Write a while loop checking if x is less than 10.', 
            starterCode: 'int x=0;', 
            hint: 'while(x < 10) { }', 
            validationRegex: /while\s*\(\s*x\s*<\s*10\s*\)/ 
        } 
      },
      { 
        id: 'java-10', 
        title: 'Switch Statements', 
        definition: 'A Switch statement is a cleaner alternative to many "else-if" blocks when you are comparing one variable against multiple constants. It jumps directly to the matching case.',
        whyItMatters: 'It makes code easier to read when handling things like menu selections (Case 1: Play, Case 2: Settings).', 
        keyPoints: [
            'Case: Defines a matching value.',
            'Break: Stops the code from falling through to the next case.',
            'Default: Runs if no case matches.'
        ], 
        sampleCode: 'int day = 1;\nswitch(day) {\n  case 1: System.out.println("Monday"); break;\n}', 
        commonMistakes: ['Forgetting the "break" keyword, causing multiple cases to run.'], 
        practiceQuestion: { 
            question: 'Start a switch statement for variable "grade".', 
            starterCode: 'char grade = "A";', 
            hint: 'switch(grade) { }', 
            validationRegex: /switch\s*\(\s*grade\s*\)/ 
        } 
      },
      { 
        id: 'java-11', 
        title: 'Constructors', 
        definition: 'A Constructor is a special method used to initialize objects. It is called automatically when you create a new object (using "new"). It has the same name as the class and no return type.',
        whyItMatters: 'It ensures that an object is set up correctly (e.g., a BankAccount has an owner and a balance) before it is used.', 
        keyPoints: [
            'Name: Must match Class name exactly.',
            'Return: No return type (not even void).',
            'Usage: Car c = new Car(); calls the constructor.'
        ], 
        sampleCode: 'class Box {\n  Box() {\n    System.out.println("Created!");\n  }\n}', 
        commonMistakes: ['Adding "void" to a constructor, turning it into a regular method.'], 
        practiceQuestion: { 
            question: 'Create a constructor for class "Robot".', 
            starterCode: 'class Robot {', 
            hint: 'Robot() { }', 
            validationRegex: /Robot\s*\(\s*\)\s*\{/ 
        } 
      },
      { 
        id: 'java-12', 
        title: 'Inheritance', 
        definition: 'Inheritance allows a new class (Child) to adopt the properties and methods of an existing class (Parent). It uses the keyword "extends". This promotes code reuse.',
        whyItMatters: 'Instead of writing "walk()" for Dog, Cat, and Horse, you write it once in "Animal" and they all inherit it.', 
        keyPoints: [
            'Keyword: extends',
            'Super: Refers to the parent class.',
            'Relationship: "Dog is an Animal".'
        ], 
        sampleCode: 'class Animal {}\nclass Dog extends Animal {}', 
        commonMistakes: ['Trying to extend multiple classes (Java only allows one parent).'], 
        practiceQuestion: { 
            question: 'Create class "Car" extending "Vehicle".', 
            starterCode: '', 
            hint: 'class Car extends Vehicle { }', 
            validationRegex: /class\s+Car\s+extends\s+Vehicle/ 
        } 
      },
      { 
        id: 'java-13', 
        title: 'ArrayLists', 
        definition: 'An ArrayList is a flexible, resizable array. Unlike standard arrays, you can add and remove items dynamically. It only holds objects, not primitives (so use Integer, not int).',
        whyItMatters: 'Real-world data changes size constantly (e.g., a list of online users). ArrayLists handle this effortlessly.', 
        keyPoints: [
            'Import: java.util.ArrayList;',
            'Add: list.add(item);',
            'Get: list.get(index);'
        ], 
        sampleCode: 'ArrayList<String> list = new ArrayList<>();\nlist.add("Java");', 
        commonMistakes: ['Trying to use "int" instead of "Integer" inside the < > brackets.'], 
        practiceQuestion: { 
            question: 'Create an ArrayList of Strings named "names".', 
            starterCode: '', 
            hint: 'ArrayList<String> names = new ArrayList<>();', 
            validationRegex: /ArrayList\s*<\s*String\s*>\s*names/ 
        } 
      }
    ]
  },
  {
    id: 'javascript',
    name: 'JavaScript',
    icon: '📜',
    color: 'bg-yellow-100 text-yellow-700 border-yellow-200',
    description: 'The language of the web. Makes websites interactive.',
    chapters: [
      {
        id: 'js-1',
        title: 'Intro to JS',
        definition: 'JavaScript is the engine of the web. While HTML is the structure and CSS is the paint, JavaScript is the electricity. It makes things move, update, and react when you click. It runs directly in your browser.',
        whyItMatters: 'It is the most popular programming language in the world. If you want to build websites, you MUST know JS.',
        keyPoints: [
            'Location: Runs inside the browser (or Node.js).',
            'Console: Use console.log() to debug.',
            'Dynamic: Can change HTML and CSS on the fly.'
        ],
        sampleCode: 'console.log("Hello Web");\nalert("Welcome!");',
        commonMistakes: ['Confusing Java with JavaScript (they are completely different).'],
        practiceQuestion: {
          question: 'Log "Hi" to the console.',
          starterCode: '',
          hint: 'use console.log("Hi")',
          validationRegex: /console\.log\s*\(\s*["']Hi["']\s*\)/
        }
      },
      { 
        id: 'js-2', 
        title: 'Variables (Let & Const)', 
        definition: 'Modern JavaScript uses "let" and "const" to store data. "let" is for values that might change (like a score), and "const" is for values that stay the same (like a tax rate). Avoid using the old "var" keyword.',
        whyItMatters: 'Using "const" prevents accidental changes to data, making your code safer and less bug-prone.', 
        keyPoints: [
            'let: Can be reassigned (let x = 1; x = 2;).',
            'const: Cannot be reassigned (const pi = 3.14;).',
            'camelCase: Standard naming convention (myVariable).'
        ], 
        sampleCode: 'let score = 0;\nconst appName = "Game";', 
        commonMistakes: ['Trying to change a "const" variable later in code.', 'Using "var" which has confusing scoping rules.'], 
        practiceQuestion: { 
            question: 'Declare a variable named "count" equal to 0 using let.', 
            starterCode: '', 
            hint: 'let count = 0;', 
            validationRegex: /let\s+count\s*=\s*0/ 
        } 
      },
      { 
        id: 'js-3', 
        title: 'Functions', 
        definition: 'Functions are blocks of code that perform actions. JS has a modern shorthand called "Arrow Functions" that look concise. Functions can take inputs (arguments) and return outputs.',
        whyItMatters: 'Functions handle events like "onClick". When a user clicks a button, a function runs to handle it.', 
        keyPoints: [
            'Arrow Syntax: const name = () => { ... }',
            'Legacy Syntax: function name() { ... }',
            'Call: name(); runs the code.'
        ], 
        sampleCode: 'const sayHi = (name) => {\n  console.log("Hi " + name);\n}', 
        commonMistakes: ['Forgetting the arrow => in syntax.', 'Not using parentheses () for arguments.'], 
        practiceQuestion: { 
            question: 'Write an arrow function named "run".', 
            starterCode: '', 
            hint: 'const run = () => {}', 
            validationRegex: /const\s+run\s*=\s*\(\)\s*=>/ 
        } 
      },
      { 
        id: 'js-4', 
        title: 'Comparison Logic', 
        definition: 'JavaScript has a strict equality operator (===). Unlike (==), strict equality checks both the value AND the type (so "5" does not equal 5). This avoids weird bugs where text is accidentally treated as numbers.',
        whyItMatters: 'Loose comparison (==) leads to unpredictable behavior. Professional JS developers almost always use ===.', 
        keyPoints: [
            'Strict: === (Checks value & type).',
            'Loose: == (Checks value only, converts type).',
            'Not Equal: !== is the strict "not equal".'
        ], 
        sampleCode: 'if (age === 18) {\n  console.log("Adult");\n}', 
        commonMistakes: ['Using single = (assignment) inside an if statement.', 'Using == and getting unexpected true results.'], 
        practiceQuestion: { 
            question: 'Check if age is strictly equal to 10.', 
            starterCode: '', 
            hint: 'if (age === 10)', 
            validationRegex: /if\s*\(\s*age\s*===\s*10\s*\)/ 
        } 
      },
      { 
        id: 'js-5', 
        title: 'Arrays & Lists', 
        definition: 'JS Arrays are dynamic lists. You can add, remove, and mix types inside them easily. They come with powerful built-in methods like .push() to add items or .length to count them.',
        whyItMatters: 'Used everywhere: lists of tweets, shopping cart items, image galleries.', 
        keyPoints: [
            'Create: let list = [1, "two", 3];',
            'Add: list.push(4);',
            'Access: list[0];'
        ], 
        sampleCode: 'let colors = ["red", "blue"];\ncolors.push("green");', 
        commonMistakes: ['Assuming arrays are fixed size (they grow/shrink).'], 
        practiceQuestion: { 
            question: 'Create an array with values 1, 2, 3.', 
            starterCode: '', 
            hint: '[1, 2, 3]', 
            validationRegex: /\[\s*1\s*,\s*2\s*,\s*3\s*\]/ 
        } 
      },
      { 
        id: 'js-6', 
        title: 'Objects (JSON style)', 
        definition: 'Objects are collections of key-value pairs. They describe "things" with properties. A "Car" object might have a color, model, and year. This format is the basis of JSON, the language of data transfer on the web.',
        whyItMatters: 'Most data you fetch from APIs (like weather or user data) comes in this Object format.', 
        keyPoints: [
            'Syntax: { key: value, key2: value2 }',
            'Access: object.key or object["key"]',
            'Nesting: Objects can contain other objects.'
        ], 
        sampleCode: 'const user = {\n  name: "Sam",\n  id: 1\n};\nconsole.log(user.name);', 
        commonMistakes: ['Forgetting commas between properties.', 'Using = instead of : inside the object.'], 
        practiceQuestion: { 
            question: 'Create an object with a property "id" set to 1.', 
            starterCode: '', 
            hint: '{ id: 1 }', 
            validationRegex: /\{\s*id\s*:\s*1\s*\}/ 
        } 
      },
      { 
        id: 'js-7', 
        title: 'Loops', 
        definition: 'Loops in JS allow you to iterate over arrays or repeat actions. The "for loop" is classic, but modern JS often uses .forEach() or .map() to work with lists more cleanly.',
        whyItMatters: 'Essential for rendering lists of items on a screen (like creating a card for every product in a shop).', 
        keyPoints: [
            'Standard: for(let i=0; i<n; i++)',
            'Modern: array.forEach(item => ...)',
            'Break: Exits the loop early.'
        ], 
        sampleCode: 'for(let i=0; i<5; i++) {\n  console.log(i);\n}', 
        commonMistakes: ['Creating an infinite loop that freezes the browser tab.'], 
        practiceQuestion: { 
            question: 'Write the start of a for loop.', 
            starterCode: '', 
            hint: 'for(let i=0; i<10; i++)', 
            validationRegex: /for\s*\(/ 
        } 
      },
      { 
        id: 'js-8', 
        title: 'The DOM', 
        definition: 'The DOM (Document Object Model) is how JS sees HTML. It can find an element (like a button) and change its text, color, or hide it. This is how "interactive" websites work.',
        whyItMatters: 'Without DOM manipulation, JS acts in a void. DOM access is what allows JS to actually update the screen.', 
        keyPoints: [
            'Select: document.querySelector(".class")',
            'Change: element.innerText = "New"',
            'Style: element.style.color = "red"'
        ], 
        sampleCode: 'const btn = document.querySelector("button");\nbtn.innerText = "Clicked!";', 
        commonMistakes: ['Trying to select an element before it loads on the page.', 'Misspelling the selector ID or Class.'], 
        practiceQuestion: { 
            question: 'Select the "body" element.', 
            starterCode: '', 
            hint: 'document.querySelector("body")', 
            validationRegex: /document\.querySelector\s*\(\s*["']body["']\s*\)/ 
        } 
      },
      { 
        id: 'js-9', 
        title: 'Event Listeners', 
        definition: 'Events are how JS responds to user actions like clicks, key presses, or mouse movements. An "Event Listener" waits for a specific event to happen and then runs a function.',
        whyItMatters: 'This is the bridge between the user and the code. It makes buttons clickable and forms submittable.', 
        keyPoints: [
            'Syntax: element.addEventListener("click", func)',
            'Types: click, mouseover, keydown, submit.',
            'Callback: The function that runs when event triggers.'
        ], 
        sampleCode: 'btn.addEventListener("click", () => {\n  alert("Clicked!");\n});', 
        commonMistakes: ['Forgetting to put the function code inside the listener.', 'Misspelling event names.'], 
        practiceQuestion: { 
            question: 'Add a "click" listener to variable "btn".', 
            starterCode: '', 
            hint: 'btn.addEventListener("click", () => {})', 
            validationRegex: /btn\.addEventListener\s*\(\s*["']click["']\s*,/ 
        } 
      },
      { 
        id: 'js-10', 
        title: 'String Methods', 
        definition: 'JS Strings come with built-in tools. You can force text to uppercase, replace words, or split a sentence into a list of words. Template literals (backticks) make combining variables and strings easy.',
        whyItMatters: 'Essential for cleaning up user input (like emails) and formatting messages.', 
        keyPoints: [
            'Template: `Hello ${name}`',
            'Uppercase: str.toUpperCase()',
            'Replace: str.replace("old", "new")'
        ], 
        sampleCode: 'const name = "sam";\nconsole.log(`Hi ${name.toUpperCase()}`);', 
        commonMistakes: ['Using quotes "" instead of backticks `` for template literals.'], 
        practiceQuestion: { 
            question: 'Convert string variable "text" to uppercase.', 
            starterCode: '', 
            hint: 'text.toUpperCase()', 
            validationRegex: /text\.toUpperCase\s*\(\s*\)/ 
        } 
      },
      { 
        id: 'js-11', 
        title: 'The Math Object', 
        definition: 'The Math object allows you to perform complex calculations. It can round numbers, find the square root, or generate random numbers.',
        whyItMatters: 'Crucial for game mechanics (random loot), positioning elements, or handling money (rounding).', 
        keyPoints: [
            'Round: Math.round(4.6) -> 5',
            'Random: Math.random() -> 0 to 1',
            'Max: Math.max(1, 10) -> 10'
        ], 
        sampleCode: 'let dice = Math.floor(Math.random() * 6) + 1;', 
        commonMistakes: ['Thinking Math.random() gives a whole number (it gives a decimal 0.0-0.99).'], 
        practiceQuestion: { 
            question: 'Use Math.round() on the number 4.6.', 
            starterCode: '', 
            hint: 'Math.round(4.6)', 
            validationRegex: /Math\.round\s*\(\s*4\.6\s*\)/ 
        } 
      },
      { 
        id: 'js-12', 
        title: 'Array Methods (Map)', 
        definition: 'Map is a powerful way to transform a list. It takes an array, runs a function on every item, and returns a new array with the changes. It is cleaner than a for loop.',
        whyItMatters: 'Extensively used in React and modern JS to convert raw data into HTML elements.', 
        keyPoints: [
            'Syntax: arr.map(item => newItem)',
            'Returns: A new array.',
            'Original: Does not change the original array.'
        ], 
        sampleCode: 'const nums = [1, 2];\nconst doubled = nums.map(n => n * 2);', 
        commonMistakes: ['Forgetting to "return" a value inside the map function.'], 
        practiceQuestion: { 
            question: 'Use .map() on "arr" to double values.', 
            starterCode: 'const arr = [1, 2];', 
            hint: 'arr.map(x => x * 2)', 
            validationRegex: /arr\.map\s*\(/ 
        } 
      },
      { 
        id: 'js-13', 
        title: 'Timing (SetTimeout)', 
        definition: 'JavaScript allows you to delay code execution. setTimeout runs a function once after a specified delay (in milliseconds).',
        whyItMatters: 'Used for animations, showing notifications that disappear, or simulating network delays.', 
        keyPoints: [
            'Syntax: setTimeout(func, delay_ms)',
            'Delay: 1000ms = 1 second.',
            'Async: Code after setTimeout runs immediately, it does not wait.'
        ], 
        sampleCode: 'setTimeout(() => {\n  console.log("Delayed!");\n}, 2000);', 
        commonMistakes: ['Expecting the code below setTimeout to pause/wait.'], 
        practiceQuestion: { 
            question: 'Run a function after 1000ms using setTimeout.', 
            starterCode: '', 
            hint: 'setTimeout(() => {}, 1000)', 
            validationRegex: /setTimeout\s*\(.*,\s*1000\s*\)/ 
        } 
      }
    ]
  },
  {
    id: 'html',
    name: 'HTML',
    icon: '🧱',
    color: 'bg-red-100 text-red-700 border-red-200',
    description: 'The skeleton of all websites. Defines structure.',
    chapters: [
      {
        id: 'html-1',
        title: 'HTML Structure',
        definition: 'HTML is the skeleton of a webpage. It uses "tags" wrapped in angle brackets <> to tell the browser what content is. Every page has a root <html> tag, a <head> for settings, and a <body> for visible content.',
        whyItMatters: 'Without structure, a website is just a blob of text. HTML gives meaning to content.',
        keyPoints: ['Tags usually come in pairs: <p>...</p>', '<!DOCTYPE html> tells browser version.', 'Body contains what you see.'],
        sampleCode: '<html>\n  <body>\n    <h1>Hello</h1>\n  </body>\n</html>',
        commonMistakes: ['Forgetting to close a tag with </tag>.'],
        practiceQuestion: {
            question: 'Write a div tag pair.',
            starterCode: '',
            hint: '<div>...</div>',
            validationRegex: /<div.*>.*<\/div>/
        }
      },
      {
        id: 'html-2',
        title: 'Text Tags',
        definition: 'HTML has specific tags for headings (h1 to h6) and paragraphs (p). Headings are for titles and should be used in order (h1 is main title, h2 is section). Paragraphs are for normal text blocks.',
        whyItMatters: 'Headings help Google understand your page and help screen readers for the blind navigate content.',
        keyPoints: ['h1 is the biggest, h6 smallest.', 'p is for blocks of text.', 'Use logic, not just size.'],
        sampleCode: '<h1>Main Title</h1>\n<p>This is a paragraph.</p>',
        commonMistakes: ['Using h1 just to make text big (use CSS for that).', 'Skipping heading levels (h1 then h4).'],
        practiceQuestion: {
            question: 'Create an h1 tag with text "Hi".',
            starterCode: '',
            hint: '<h1>Hi</h1>',
            validationRegex: /<h1.*>Hi<\/h1>/
        }
      },
      {
        id: 'html-3',
        title: 'Links (Anchors)',
        definition: 'The "a" tag (Anchor) creates a hyperlink to another page. It needs an "href" attribute, which tells the browser where to go when clicked. This is the "Web" part of the World Wide Web.',
        whyItMatters: 'Links connect pages together. Without them, the internet would be disconnected documents.',
        keyPoints: ['Tag: <a href="url">Link</a>', 'Target: _blank opens new tab.', 'Href is mandatory.'],
        sampleCode: '<a href="https://google.com">Go to Google</a>',
        commonMistakes: ['Forgetting the href attribute.', 'Putting the URL between the tags instead of inside the opening tag.'],
        practiceQuestion: {
            question: 'Create a link to "site.com".',
            starterCode: '',
            hint: '<a href="site.com">Click</a>',
            validationRegex: /<a\s+href=["']site.com["'].*>.*<\/a>/
        }
      },
      {
        id: 'html-4',
        title: 'Images',
        definition: 'The <img> tag embeds a picture. Unlike text tags, it is "self-closing" meaning it does not have a closing </img> tag. It uses the "src" attribute to find the image file and "alt" to describe it.',
        whyItMatters: 'Images make sites visual. The "alt" text is crucial for accessibility and if the image fails to load.',
        keyPoints: ['Self-closing: <img />', 'Src: Source URL.', 'Alt: Description text.'],
        sampleCode: '<img src="cat.jpg" alt="A cute cat" />',
        commonMistakes: ['Forgetting the alt text.', 'Trying to add a closing </img> tag.'],
        practiceQuestion: {
            question: 'Write an img tag with src "pic.jpg".',
            starterCode: '',
            hint: '<img src="pic.jpg" />',
            validationRegex: /<img\s+src=["']pic.jpg["'].*\/>/
        }
      },
      {
        id: 'html-5',
        title: 'Lists',
        definition: 'HTML supports ordered lists (numbers) and unordered lists (bullets). The parent tag is <ol> or <ul>, and every item inside must be wrapped in an <li> (List Item) tag.',
        whyItMatters: 'Lists organize data clearly. Menus, features, and steps are all lists.',
        keyPoints: ['ul: Bullet points.', 'ol: Numbered 1, 2, 3.', 'li: The actual item.'],
        sampleCode: '<ul>\n  <li>Milk</li>\n  <li>Eggs</li>\n</ul>',
        commonMistakes: ['Putting text directly inside ul without an li tag.'],
        practiceQuestion: {
            question: 'Create a "ul" list with one "li" item.',
            starterCode: '',
            hint: '<ul><li>Item</li></ul>',
            validationRegex: /<ul.*>\s*<li.*>.*<\/li>\s*<\/ul>/
        }
      },
      {
        id: 'html-6',
        title: 'Forms & Inputs',
        definition: 'Forms allow users to send data to the server. The <input> tag is versatile—it can be a text box, checkbox, radio button, or date picker depending on the "type" attribute.',
        whyItMatters: 'Forms are how you log in, search, and buy things online.',
        keyPoints: ['<input type="text" />', '<button>Submit</button>', 'Placeholders show hint text.'],
        sampleCode: '<input type="email" placeholder="Enter email" />',
        commonMistakes: ['Forgetting to close input tags (they are self-closing).'],
        practiceQuestion: {
            question: 'Create a text input.',
            starterCode: '',
            hint: '<input type="text" />',
            validationRegex: /<input\s+type=["']text["'].*\/>/
        }
      },
      {
        id: 'html-7',
        title: 'Tables',
        definition: 'Tables display data in rows and columns. The main tag is <table>. Inside, you have <tr> (Table Row), and inside rows you have <td> (Table Data) or <th> (Table Header).',
        whyItMatters: 'The standard way to show structured data like financial reports, schedules, or scoreboards.',
        keyPoints: [
            'Structure: Table > Row > Data.',
            '<th>: Bold, centered text for headers.',
            'Border: Often handled in CSS, but structure is HTML.'
        ],
        sampleCode: '<table>\n  <tr><td>A</td><td>B</td></tr>\n</table>',
        commonMistakes: ['Putting <td> outside of a <tr> tag.', 'Forgetting to close rows.'],
        practiceQuestion: {
            question: 'Write a table row (tr) with one data cell (td).',
            starterCode: '',
            hint: '<tr><td>Data</td></tr>',
            validationRegex: /<tr.*>\s*<td.*>.*<\/td>\s*<\/tr>/
        }
      },
      {
        id: 'html-8',
        title: 'Semantic HTML',
        definition: 'Semantic tags describe their meaning. Instead of using generic <div>s for everything, use <header>, <footer>, <nav>, and <article>. This tells search engines exactly what part of the page is what.',
        whyItMatters: 'Accessibility and SEO. Screen readers can jump straight to the "nav" or "main" content.',
        keyPoints: [
            '<nav>: Navigation links.',
            '<footer>: Copyright and contacts.',
            '<main>: The primary content.'
        ],
        sampleCode: '<header>\n  <h1>Logo</h1>\n</header>',
        commonMistakes: ['Using these tags for visual effects only (use CSS for that).'],
        practiceQuestion: {
            question: 'Write a <header> tag containing "Hi".',
            starterCode: '',
            hint: '<header>Hi</header>',
            validationRegex: /<header.*>Hi<\/header>/
        }
      },
      {
        id: 'html-9',
        title: 'Advanced Inputs',
        definition: 'Inputs are not just text boxes. You can use types like "checkbox" (multiple choice), "radio" (single choice), or "date" (calendar picker). Radio buttons must share the same "name" to work as a group.',
        whyItMatters: 'Better user experience. Picking a date from a calendar is easier than typing "01/01/2020".',
        keyPoints: [
            'Checkbox: [ ] Yes [ ] No.',
            'Radio: ( ) A ( ) B.',
            'Name Attribute: Groups radio buttons together.'
        ],
        sampleCode: '<input type="radio" name="gender" value="male" /> Male',
        commonMistakes: ['Forgetting the "name" attribute on radio buttons, allowing multiple to be selected.'],
        practiceQuestion: {
            question: 'Create a checkbox input.',
            starterCode: '',
            hint: '<input type="checkbox" />',
            validationRegex: /<input\s+type=["']checkbox["'].*\/>/
        }
      },
      {
        id: 'html-10',
        title: 'Video & Audio',
        definition: 'HTML5 introduced <video> and <audio> tags to play media natively without Flash or plugins. You just provide the "src" file and add "controls" to show play/pause buttons.',
        whyItMatters: 'Video is the dominant media on the web. These tags make embedding standard MP4 or MP3 files easy.',
        keyPoints: [
            'Controls: Attribute adds play/volume buttons.',
            'Source: Can define multiple formats for backup.',
            'Width: Good to set a size for video.'
        ],
        sampleCode: '<video src="movie.mp4" controls width="300"></video>',
        commonMistakes: ['Forgetting the "controls" attribute (user cannot play the video).'],
        practiceQuestion: {
            question: 'Write a video tag with controls.',
            starterCode: '',
            hint: '<video controls src="..."></video>',
            validationRegex: /<video.*controls.*>.*<\/video>/
        }
      },
      {
        id: 'html-11',
        title: 'The Head Tag',
        definition: 'The <head> contains metadata about the page that is not visible on screen. This includes the <title> (browser tab text), <meta> tags for SEO description, and links to CSS files.',
        whyItMatters: 'This is how you control how your site appears in Google results and browser tabs.',
        keyPoints: [
            '<title>: Text in the browser tab.',
            '<meta charset="UTF-8">: Handles special characters.',
            '<link>: Connects CSS styles.'
        ],
        sampleCode: '<head>\n  <title>My Page</title>\n</head>',
        commonMistakes: ['Putting visible content (like <h1>) inside the <head>.'],
        practiceQuestion: {
            question: 'Write a title tag with "Home".',
            starterCode: '',
            hint: '<title>Home</title>',
            validationRegex: /<title>Home<\/title>/
        }
      }
    ]
  },
  {
    id: 'css',
    name: 'CSS',
    icon: '🎨',
    color: 'bg-blue-100 text-blue-700 border-blue-200',
    description: 'Makes websites look beautiful. Styles the structure.',
    chapters: [
      {
        id: 'css-1',
        title: 'CSS Syntax',
        definition: 'CSS uses "Selectors" to pick HTML elements and "Properties" to change their look. The format is: selector { property: value; }. You can target tags, classes, or IDs.',
        whyItMatters: 'CSS separates content (HTML) from design. You can change the entire look of a site just by swapping the CSS.',
        keyPoints: ['Selector: What to style (e.g., p, h1).', 'Braces { }: Hold the rules.', 'Semicolon ;: Ends each rule.'],
        sampleCode: 'h1 {\n  color: blue;\n  font-size: 20px;\n}',
        commonMistakes: ['Forgetting the semicolon.', 'Using colon : after the property incorrectly.'],
        practiceQuestion: {
            question: 'Set the color to red.',
            starterCode: '',
            hint: 'color: red;',
            validationRegex: /color\s*:\s*red\s*;/
        }
      },
      {
        id: 'css-2',
        title: 'Colors & Backgrounds',
        definition: 'You can color text using "color" and element backgrounds using "background-color". Colors can be names (red), hex codes (#ff0000), or RGB values.',
        whyItMatters: 'Color conveys mood, branding, and hierarchy.',
        keyPoints: ['color: Affects text.', 'background-color: Affects the box.', 'Contrast matters for reading.'],
        sampleCode: 'body {\n  background-color: #f0f0f0;\n  color: #333;\n}',
        commonMistakes: ['Confusing color (text) with background-color.'],
        practiceQuestion: {
            question: 'Set background-color to black.',
            starterCode: '',
            hint: 'background-color: black;',
            validationRegex: /background-color\s*:\s*black\s*;/
        }
      },
      {
        id: 'css-3',
        title: 'The Box Model',
        definition: 'Everything in web design is a box. Each box has Margin (space outside), Border (the edge), Padding (space inside), and Content. Understanding this model is key to layout.',
        whyItMatters: 'If elements are too close or misaligned, it is usually a Box Model issue.',
        keyPoints: ['Margin: Pushes neighbors away.', 'Padding: Pushes content inward.', 'Border: The outline.'],
        sampleCode: 'div {\n  margin: 10px;\n  padding: 20px;\n  border: 1px solid black;\n}',
        commonMistakes: ['Confusing margin (outside) with padding (inside).'],
        practiceQuestion: {
            question: 'Set padding to 10px.',
            starterCode: '',
            hint: 'padding: 10px;',
            validationRegex: /padding\s*:\s*10px\s*;/
        }
      },
      {
        id: 'css-4',
        title: 'Classes & IDs',
        definition: 'Classes (.) allow you to style many elements the same way. IDs (#) are for one unique element. Classes are reusable; IDs are unique.',
        whyItMatters: 'You rarely style generic tags like "div". You style specific "cards" or "buttons" using classes.',
        keyPoints: ['.classname for classes.', '#idname for IDs.', 'Classes are reusable.'],
        sampleCode: '.btn {\n  background: blue;\n}\n#header {\n  height: 50px;\n}',
        commonMistakes: ['Forgetting the dot . before a class name in CSS.'],
        practiceQuestion: {
            question: 'Style a class named ".box" with width 100px.',
            starterCode: '',
            hint: '.box { width: 100px; }',
            validationRegex: /\.box\s*\{\s*width\s*:\s*100px\s*;\s*\}/
        }
      },
      {
        id: 'css-5',
        title: 'Flexbox Layout',
        definition: 'Flexbox is a modern layout mode that makes aligning things easy. By adding "display: flex" to a parent, you can align children in rows or columns, center them, or space them out evenly.',
        whyItMatters: 'Before Flexbox, centering items was a nightmare. Flexbox is the standard for modern UI layout.',
        keyPoints: ['display: flex turns it on.', 'justify-content: aligns horizontally.', 'align-items: aligns vertically.'],
        sampleCode: '.container {\n  display: flex;\n  justify-content: center;\n}',
        commonMistakes: ['Applying flex properties to the child instead of the parent container.'],
        practiceQuestion: {
            question: 'Set display to flex.',
            starterCode: '',
            hint: 'display: flex;',
            validationRegex: /display\s*:\s*flex\s*;/
        }
      },
      {
        id: 'css-6',
        title: 'Text Styling',
        definition: 'CSS gives you full control over typography. You can change fonts (font-family), size (font-size), weight (boldness), and alignment.',
        whyItMatters: 'Good typography makes content readable and engaging.',
        keyPoints: ['font-size: usually in px or rem.', 'font-weight: bold or 100-900.', 'text-align: center, left, right.'],
        sampleCode: 'p {\n  font-family: Arial;\n  font-size: 16px;\n  font-weight: bold;\n}',
        commonMistakes: ['Using generic unitless numbers for font-size (must need px or rem).'],
        practiceQuestion: {
            question: 'Set font-size to 12px.',
            starterCode: '',
            hint: 'font-size: 12px;',
            validationRegex: /font-size\s*:\s*12px\s*;/
        }
      },
      {
        id: 'css-7',
        title: 'Hover States',
        definition: 'CSS can respond to the mouse cursor! The :hover pseudo-class allows you to change the style of an element when the user hovers over it. This provides visual feedback.',
        whyItMatters: 'Interactive UI. Buttons should darken, and links should change color so users know they are clickable.',
        keyPoints: [
            'Syntax: selector:hover { }',
            'Order: Must come after the normal style.',
            'Usage: Commonly used for buttons and links.'
        ],
        sampleCode: 'button:hover {\n  background-color: darkblue;\n}',
        commonMistakes: ['Adding a space between selector and :hover (e.g., div :hover).'],
        practiceQuestion: {
            question: 'Change background to red on hover for ".btn".',
            starterCode: '',
            hint: '.btn:hover { background: red; }',
            validationRegex: /\.btn:hover\s*\{\s*background.*:\s*red\s*;/
        }
      },
      {
        id: 'css-8',
        title: 'Positioning',
        definition: 'The "position" property controls how an element sits on the page. "Relative" allows small nudges, while "Absolute" removes the element from the flow and sticks it somewhere specific.',
        whyItMatters: 'Necessary for overlays, sticky headers, and placing icons exactly where you want them.',
        keyPoints: [
            'relative: Normal spot, but adjustable.',
            'absolute: Positioned relative to the nearest positioned ancestor.',
            'fixed: Stuck to the screen (like a navbar).'
        ],
        sampleCode: '.icon {\n  position: absolute;\n  top: 10px;\n  right: 10px;\n}',
        commonMistakes: ['Using absolute without setting "position: relative" on the parent container.'],
        practiceQuestion: {
            question: 'Set position to absolute.',
            starterCode: '',
            hint: 'position: absolute;',
            validationRegex: /position\s*:\s*absolute\s*;/
        }
      },
      {
        id: 'css-9',
        title: 'CSS Grid',
        definition: 'Grid is the most powerful layout system. While Flexbox is 1D (row OR column), Grid is 2D (rows AND columns). You can design complex newspaper-style layouts easily.',
        whyItMatters: 'Grid handles overall page structure (Sidebar + Main + Footer) better than anything else.',
        keyPoints: [
            'display: grid',
            'grid-template-columns: 1fr 1fr (Two equal columns).',
            'Gap: Space between grid items.'
        ],
        sampleCode: '.layout {\n  display: grid;\n  grid-template-columns: 200px 1fr;\n}',
        commonMistakes: ['Mixing up Grid and Flexbox syntax.'],
        practiceQuestion: {
            question: 'Set display to grid.',
            starterCode: '',
            hint: 'display: grid;',
            validationRegex: /display\s*:\s*grid\s*;/
        }
      },
      {
        id: 'css-10',
        title: 'Responsive Design',
        definition: 'Websites must look good on phones, tablets, and desktops. "Media Queries" allow you to apply different CSS rules based on screen size (e.g., "If screen is smaller than 600px, make font smaller").',
        whyItMatters: 'Mobile traffic is huge. If your site doesn\'t work on a phone, you lose 50% of users.',
        keyPoints: [
            '@media (max-width: 600px) { ... }',
            'Mobile First: Design for small screens first, then expand.',
            'Percent widths: Use % instead of px for fluid layouts.'
        ],
        sampleCode: '@media (max-width: 500px) {\n  body {\n    font-size: 14px;\n  }\n}',
        commonMistakes: ['Forgetting the closing brace } for the media query block.'],
        practiceQuestion: {
            question: 'Write a media query for max-width 600px.',
            starterCode: '',
            hint: '@media (max-width: 600px) { }',
            validationRegex: /@media\s*\(\s*max-width\s*:\s*600px\s*\)/
        }
      },
      {
        id: 'css-11',
        title: 'Transitions',
        definition: 'Transitions make changes smooth instead of instant. If you change a color on hover, a transition makes it fade in slowly. It adds a premium feel to your UI.',
        whyItMatters: 'User experience. Instant changes feel jerky; smooth transitions feel natural and polished.',
        keyPoints: [
            'transition: property duration;',
            'Example: transition: all 0.3s;',
            'Ease: Controls the speed curve (ease-in, linear).'
        ],
        sampleCode: 'button {\n  background: blue;\n  transition: background 0.5s;\n}',
        commonMistakes: ['Putting the transition on the :hover state instead of the base state (causes abrupt reset).'],
        practiceQuestion: {
            question: 'Add a transition for "all" lasting "0.5s".',
            starterCode: '',
            hint: 'transition: all 0.5s;',
            validationRegex: /transition\s*:\s*all\s+0\.5s\s*;/
        }
      }
    ]
  }
];

export const TIPS = [
  "Code a little bit every day.",
  "Don't copy-paste without understanding.",
  "Errors are your friends—they tell you what to fix!",
  "Take breaks if you get stuck.",
  "Teach what you learn to someone else."
];
