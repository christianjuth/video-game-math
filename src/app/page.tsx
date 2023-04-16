"use client";

import { Sketch, VecRenderer } from "../components/VecRenderer";
import { Editor, CodeExample } from "../components/Editor";
import { Tests, TestCase } from "@/components/Tests";
import expect from "expect.js";
import { Panel } from "@/components/Panel";
import { Markdown } from "@/components/Markdown";

class Vec2 {
  x: number;
  y: number;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }
}

// Test 1
const TEST_SET_1: TestCase[] = [
  [
    "Vec2 is defined",
    (classes) => {
      expect(classes.Vec2).to.a("function");
    },
  ],
  [
    "Vec2 constructor stets x correctly",
    (classes) => {
      const x = Math.random();
      const vec = new classes.Vec2(x, 0);
      expect(vec.x).to.be(x);
    },
  ],
  [
    "Vec2 constructor stets y correctly",
    (classes) => {
      const y = Math.random();
      const vec = new classes.Vec2(0, y);
      expect(vec.y).to.be(y);
    },
  ],
  [
    "Vec2 constructor sets color correctly",
    (classes) => {
      const color = `#${Math.floor(Math.random() * 16777215).toString(16)}`;
      const vec = new classes.Vec2(0, 0, color);
      expect(vec.color).to.be(color);
    },
  ],
];

const ADDITION_SKETCH: Sketch = (classes) => {
  const { Vec2 } = classes;
  const vec1 = new Vec2(0.4, -0.4, "mediumvioletred");
  const vec2 = vec1.add(vec1);
  vec2.color = "white";
  return [vec2, vec1];
};

const ADDITON_TESTS: TestCase[] = [
  [
    "Vec2 add function is defined",
    (classes) => {
      const vec = new classes.Vec2(0, 0);
      expect(vec.add).to.a("function");
    },
  ],
  [
    "Vec2 add returns correct value",
    (classes) => {
      const vec1 = new classes.Vec2(1, 2);
      const vec2 = new classes.Vec2(3, 4);
      const vec3 = vec1.add(vec2);
      expect(vec3.x).to.be(4);
      expect(vec3.y).to.be(6);
    },
  ],
];

const DOT_PRODUCT_TESTS: TestCase[] = [
  [
    "Vec2 dot function is defined",
    (classes) => {
      const vec = new classes.Vec2(0, 0);
      expect(vec.dot).to.a("function");
    },
  ],
  [
    "Vec2 dot product returns correct value",
    (classes) => {
      const vec1 = new classes.Vec2(1, 2);
      const vec2 = new classes.Vec2(3, 4);
      expect(vec1.dot(vec2)).to.be(11);
    },
  ],
];

const DOT_PRODUCT_SKETCH: Sketch = (classes, mouse) => {
  const { Vec2 } = classes;
  const vec1 = new Vec2(0.5, -0.5, "white");
  const vec2 = new Vec2(mouse.x, mouse.y, "mediumvioletred");
  const pinkCanSeeWhite = vec1.dot(vec2) > 0.3;
  return [vec1, vec2, `Dot product = ${vec1.dot(vec2)}`, `Pink can see white = ${pinkCanSeeWhite}`];
};

const MATRIX_TESTS: TestCase[] = [
  [
    "Matrix is defined",
    (classes) => {
      expect(classes.Matrix).to.a("function");
    },
  ],
  [
    "Matrix constructor sets elements correctly",
    (classes) => {
      const elements = [
        [1, 2],
        [3, 4],
      ];
      const matrix = new classes.Matrix(elements);
      expect(matrix.elements).to.eql(elements);
    },
  ],
];

const SKETCH_1: Sketch = (classes) => {
  const { Vec2, Matrix } = classes;
  return [
    new Vec2(0.5, -0.5, "mediumvioletred"),
    new Vec2(0.5, 0.5, "lawngreen"),
    new Vec2(-0.5, 0.5, "deepskyblue"),
    new Vec2(-0.5, -0.5, "white"),
  ];
};

export default function Home() {
  return (
    <Editor.Provider>
      <div className="flex flex-col items-center">
        <div className="flex flex-row justify-center w-full text-white bg-gradient-to-br from-violet-500 to-indigo-700 border-b border-indigo-800">
          <div className="max-w-7xl w-full py-60 px-5">
            <h1 className="text-5xl font-bold">
              Introduction to Linear Algebra
            </h1>
            <p className="mt-5 text-lg text-indigo-200 italic">
              An interactive introduction to linear algebra and how it applies
              to videogames
            </p>
          </div>
        </div>

        <div className="grid grid-cols-5 gap-5 w-full px-5 max-w-7xl -mt-52 z-10">
          <Panel className="p-7 col-span-3">
            <Markdown size="lg">
              {`
                # Chapter 1: Vectors and their Applications in Video Games

                A vector is a mathematical object that represents both magnitude
                (length) and direction. In the context of computer graphics and
                game development, vectors are typically used to represent
                positions, velocities, and forces, among other things. Vectors
                can be represented in various dimensions, with the most common
                being two-dimensional (2D) and three-dimensional (3D) vectors.

                A 2D vector consists of two components, commonly referred to as
                x and y, while a 3D vector has three components, x, y, and z.
                Vectors can be visualized as arrows in a coordinate system,
                where the tail of the arrow is at the origin (0, 0) and the tip
                is at the coordinates (x, y) for a 2D vector or (x, y, z) for a
                3D vector. 
               
                 Vectors can be added, subtracted, and scaled
                (multiplied by a scalar value), and various operations can be
                performed on them, such as the dot product and the cross
                product. These operations and properties make vectors an
                essential tool in linear algebra, computer graphics, and game
                development.
                `}
            </Markdown>
          </Panel>

          <Panel className="p-7 col-span-2 bg-slate-700 border border-slate-800/50">
            <Markdown className="text-white" dark>
              {`
                ## Chapter 1 outline

                1. Introduction to linear algebra and its applications in video games
                2. _Implementing a simple Vec2 class in JavaScript_
                3. _Vectors and vector operations (addition, subtraction, dot product, cross product)_
                4. _Application: Representing character movements and game object interactions_
                5. _Task: Solve various vector-related problems in different game scenarios_
                6. _Practice exercises and coding challenges related to vectors_
              `}
            </Markdown>
          </Panel>

          <span className="col-span-5 block text-center px-3 text-slate-500 italic py-5">
            Chapter 1.1 - Introduction to linear algebra and its applications in
            video games
          </span>

          <div className="col-span-3 sticky top-5 max-h-[calc(100vh_-_2.5rem)]">
            <Editor className="h-full" />
          </div>
          <div className="space-y-5 col-span-2">
            <Panel>
              <span className="p-4 block text-gray-600">
                Let&apos;s start by creating a constructor for Vec2 that allows
                us to give it an x and y value
              </span>
              <CodeExample
                code={`
                class Vec2 {
                  constructor(x, y) {
                    this.x = x;
                    this.y = y;
                  }
                }
              `}
              />
            </Panel>

            <Tests>
              {TEST_SET_1.map((test, i) => (
                <Tests.Test key={i} test={test} />
              ))}
            </Tests>

            <Panel>
              <span className="p-4 block text-gray-600 italic">
                We can use the Vec3 class like so
              </span>
              <CodeExample
                code={`
                // Up and to the right
                const vec = new Vec2(0.5, -0.5, "mediumvioletred");

                // Down and to the right
                const vec = new Vec2(0.5, 0.5, "lawngreen");

                // Up and to the right
                const vec = new Vec2(-0.5, 0.5, "deepskyblue");

                // Up and to the right
                const vec = new Vec2(-0.5, -0.5, "white");
              `}
              />
              <VecRenderer sketch={SKETCH_1} />
            </Panel>

            <span className="block px-3 text-slate-500 italic py-5 text-center max-w-sm m-auto">
              Chapter 1.1 - Introduction to linear algebra and its applications
              in video games
            </span>

            <Panel className="p-4">
              <Markdown>
                {`
                  ## Vector Addition

                  Vector addition is the process of combining two vectors to
                  create a new vector, called the resultant. To add two vectors,
                  you simply add their corresponding components together. For
                  example, given vectors A = (a1, a2) and B = (b1, b2), their sum
                  C = A + B would be calculated as (a1 + b1, a2 + b2).
                  Geometrically, this can be visualized as placing the tail of one
                  vector at the head of the other, and then drawing a new vector
                  from the tail of the first vector to the head of the second
                  vector. Vector addition has numerous applications in various
                  fields, including computer graphics, physics, and engineering,
                  where it is used to model and manipulate spatial relationships
                  between objects.
                `}
              </Markdown>
            </Panel>

            <Tests>
              {ADDITON_TESTS.map((test, i) => (
                <Tests.Test key={i} test={test} />
              ))}
            </Tests>

            <Panel>
              <span className="p-4 block text-gray-600 italic">
                We can add vectors together like so
              </span>
              <CodeExample
                code={`
                // Create an initial vector
                const vec1 = new Vec2(0.4, -0.4, 'mediumvioletred');

                // Add vec1 to itself to create a longer vector
                const vec2 = vec1.add(vec1);
                vec2.color = "white";
              `}
              />
              <VecRenderer sketch={ADDITION_SKETCH} />
            </Panel>

            <Tests>
              {DOT_PRODUCT_TESTS.map((test, i) => (
                <Tests.Test key={i} test={test} />
              ))}
            </Tests>

            <Panel className="p-4">
              <Markdown>
                {`
                  ## Vector Subtraction:

                  Vector subtraction is the process of finding the difference
                  between two vectors. To subtract one vector from another, you
                  simply subtract their corresponding components. For example,
                  given vectors A = (a1, a2) and B = (b1, b2), their difference D
                  = A - B would be calculated as (a1 - b1, a2 - b2).
                  Geometrically, vector subtraction is equivalent to adding the
                  negative of the second vector to the first vector. Vector
                  subtraction is used in various fields such as computer graphics,
                  physics, and engineering to model and manipulate spatial
                  relationships between objects, calculate relative positions, and
                  find the direction from one point to another.
                `}
              </Markdown>
            </Panel>

            <Tests>
              {DOT_PRODUCT_TESTS.map((test, i) => (
                <Tests.Test key={i} test={test} />
              ))}
            </Tests>

            <Panel className="p-4">
              <Markdown>
                {`
                  ## Dot Product

                  The dot product, also known as the scalar product, is an
                  operation that takes two vectors as inputs and returns a single
                  scalar value. In the context of Euclidean space, the dot product
                  of two vectors can be calculated as the sum of the products of
                  their corresponding components. For example, given vectors A =
                  (a1, a2) and B = (b1, b2), the dot product A · B would be
                  calculated as (a1 * b1) + (a2 * b2). 
                  
                  The dot product has several
                  useful geometric properties, including its relation to the angle
                  between the two vectors. Specifically, the dot product of two
                  vectors A and B can be expressed as |A| * |B| * cos(θ), where
                  |A| and |B| are the magnitudes of A and B, respectively, and θ
                  is the angle between them. This property makes the dot product
                  valuable for various calculations in computer graphics, physics,
                  and other fields that involve vector analysis.
               `}
              </Markdown>
            </Panel>

            <Tests>
              {DOT_PRODUCT_TESTS.map((test, i) => (
                <Tests.Test key={i} test={test} />
              ))}
            </Tests>

            <Panel>
              <span className="p-4 block text-gray-600">
                We can use the dot product to approximate how similar two
                vectors are. This can be used in a video game too calculate if a
                player is looking at an object or not.
              </span>
              <span className="p-4 pt-0 block text-indigo-600 italic font-bold">
                This example is interactive.
              </span>
              <CodeExample
                code={`
                // Create two vectors
                const vec1 = new Vec2(0.5, -0.5, "white");
                const vec2 = new Vec2(mouse.x, mouse.y, "mediumvioletred");

                // Calculate the dot product
                vec1.dot(vec2)

                // If the dot product is greater than 0.2, 
                // the player (vec1) can see the object (vec2)
                const pinkCanSeeWhite = vec1.dot(vec2) > 0.3;
              `}
              />
              <VecRenderer sketch={DOT_PRODUCT_SKETCH} />
            </Panel>
          </div>
        </div>

        <div className="grid grid-cols-5 gap-5 w-full px-5 max-w-7xl mt-5">
          <span className="col-span-5 block text-center px-3 text-slate-500 italic py-5">
            Chapter 2: Matrices and their Applications in Video Games
          </span>

          <Panel className="p-7 col-span-3">
            <Markdown size="lg">
              {`
                # Chapter 2: Matrices and their Applications in Video Games

                A matrix is a rectangular array of numbers, symbols, or
                expressions, arranged in rows and columns. Matrices are
                fundamental tools in linear algebra, computer graphics, and game
                development. They are used to represent linear transformations,
                systems of linear equations, and other mathematical structures.
                Matrices can be added, subtracted, and multiplied, with
                operations like determinant and inverse applied to certain
                square matrices.

                In computer graphics and game development, matrices are often
                used to represent transformations such as scaling, rotation, and
                translation. By applying these transformations to objects or
                scenes, developers can control the size, orientation, and
                position of game elements. Matrices can also be used to solve
                linear systems, making them essential in areas like AI
                pathfinding, physics simulations, and lighting calculations.

                Using matrices in combination with vectors, developers can
                perform complex operations that are essential for creating
                realistic game environments and interactions. For example, a
                transformation matrix can be used to manipulate the position and
                orientation of a 3D model in a game scene, while a system of
                linear equations can determine how a character should navigate
                through the environment. Overall, matrices play a vital role in
                the underlying mathematics of video games and computer graphics.
                `}
            </Markdown>
          </Panel>

          <Panel className="p-7 col-span-2 bg-slate-700 border border-slate-800/50">
            <Markdown className="text-white" dark>
              {`
                ## Chapter 1 outline

                1. _Introduction to matrices, matrix operations, and matrix-vector multiplication_
                2. _Application: Transformations in 2D game graphics (scaling, rotation)_
                3. _Implementing a simple Matrix class in JavaScript_
                4. _Task: Apply transformations to Vec2 objects using the Matrix class_
                5. _Solving systems of linear equations using Gaussian elimination_
                6. _Application 1: In-game lighting and shading calculations_
                7. _Application 2: Implementing a basic shading model for a 2D game_
                8. _Practice exercises and coding challenges related to matrices and solving linear systems_
              `}
            </Markdown>
          </Panel>

          <span className="col-span-5 block text-center px-3 text-slate-500 italic py-5">
            Chapter 2.1 - Introduction to matrices, matrix operations, and
            matrix-vector multiplication
          </span>

          <div className="col-span-3 sticky top-5 max-h-[calc(100vh_-_2.5rem)]">
            <Editor className="h-full" />
          </div>
          <div className="space-y-5 col-span-2">
            <Tests>
              {MATRIX_TESTS.map((test, i) => (
                <Tests.Test key={i} test={test} />
              ))}
            </Tests>
          </div>
        </div>
      </div>
    </Editor.Provider>
  );
}
