const memo = new Map();

function dist(a, b) {
    const key = `${a.x},${a.y},${a.z}|${b.x},${b.y},${b.z}`;
    const alternateKey = `${b.x},${b.y},${b.z}|${a.x},${a.y},${a.z}`;
    if (memo.has(key)) {
        return memo.get(key);
    }
    if (memo.has(alternateKey)) {
        return memo.get(alternateKey);
    }
    const distance = Math.sqrt((a.x - b.x) ** 2 + (a.y - b.y) ** 2 + (a.z - b.z) ** 2);
    memo.set(key, distance);
    return distance;
}

function compareX(a, b) {
	var p1 = a, p2 = b;
	return (p1.x - p2.x);
}

function compareZ(a, b) {
    var p1 = a, p2 = b;
    return (p1.z - p2.z);
}

function compareY(a, b) {
	var p1 = a, p2 = b;
	return (p1.y - p2.y);
}

function bruteForce(P, n) {
	var min = Number.POSITIVE_INFINITY;
	for (var i = 0; i < n; ++i) {
		for (var j = i + 1; j < n; ++j) {
			if (dist(P[i], P[j]) < min) {
				min = dist(P[i], P[j]);
			}
		}
	}
	return min;
}



function stripClosest(strip, size, d) {
	var min = d; // Initialize the minimum distance as d
	strip.sort(compareY);

	for (var i = 0; i < size; ++i) {
		for (var j = i + 1; j < size && (strip[j].y - strip[i].y) < min; ++j) {
			if (dist(strip[i], strip[j]) < min) {
				min = dist(strip[i], strip[j]);
			}
		}
	}
	return min;
}

function closestUtil(P, n) {
	
	if (n <= 3) {
		return bruteForce(P, n);
	}
	
	var mid = Math.floor(n / 2);
	var midPoint = P[mid];
	

	var dl = closestUtil(P, mid);
	var dr = closestUtil(P.slice(mid), n - mid);
	
	var d = Math.min(dl, dr);
	

	var strip = [];
	var j = 0;
	for (var i = 0; i < n; i++) {
		if (Math.abs(P[i].x - midPoint.x) < d) {
			strip[j] = P[i];
			j++;
		}
	}

	return Math.min(d, stripClosest(strip, j, d));
}


export function closestPairOfPointsDP(array, n) {
    let P = [...array]
	P.sort(compareX);
	return closestUtil(P, n);
}
